require('dotenv').config()
const express = require('express');
const cors = require('cors');
const logger = require('./util/logger');
const app = express();
const db = require('./util/database');

// Models that do not require associations (only for displaying selects), added here for sequelize sync
const EquipmentType = require('./models/EquipmentType');
const EquipmentVendor = require('./models/EquipmentVendor');
const LicenseVendor = require('./models/LicenseVendor');
const TicketPriority = require('./models/TicketPriority');
const TicketStatus = require('./models/TicketStatus');

// Import models to create the associations
const Customer = require('./models/Customer');
const Contact = require('./models/Contact');
const License = require('./models/License');
const Equipment = require('./models/Equipment');
const Ticket = require('./models/Ticket');
const TicketComment = require('./models/TicketComment');
const TicketTime = require('./models/TicketTime');
const Technician = require('./models/Technician');
const Address = require('./models/Address');
const TicketHistory = require('./models/TicketHistory');
const Picture = require('./models/Picture');


// Association the customer's
Contact.belongsTo(Customer, { constraints: true, onDelete: 'NO ACTION' }); // A single contact belongs to a single customer
Customer.hasMany(Contact); // set up the inverse relation 

// a license can belong to a customer or a user
License.belongsTo(Customer, {constraints: true, onDelete: 'NO ACTION'});
License.belongsTo(Contact, {constraints:true, onDelete: 'NO ACTION'}); 
License.belongsTo(Technician, {constraints:true, onDelete: 'NO ACTION'}); 
Contact.hasMany(License);
Customer.hasMany(License);
Technician.hasMany(License);

// A piece of equipment can belong to a customer, a user, and can be referenced by a ticket
Equipment.belongsTo(Customer, {constraints: true, onDelete: 'NO ACTION'});
Equipment.belongsTo(Contact, {constraints:true, onDelete: 'NO ACTION'}); 
Equipment.belongsTo(Technician, {constraints:true, onDelete: 'NO ACTION'}); 
Equipment.belongsTo(Ticket, {constraints:true, onDelete: 'NO ACTION'})
Customer.hasMany(Equipment);
Contact.hasMany(Equipment);
Technician.hasMany(Equipment);
Ticket.hasMany(Equipment);

// A ticket references a customer, a user, and a technician. History will be captured in a separate table
Ticket.belongsTo(Customer, {constraints: true, onDelete: 'NO ACTION'}); // one ticket, one customer, one issue
Ticket.belongsTo(Contact, {constraints: true, onDelete: 'NO ACTION'}); // one ticket, one contact, one issue
Ticket.belongsTo(Technician, {constraints: true, onDelete: 'NO ACTION'}); // only one owning tech at time of close
Customer.hasMany(Ticket);
Contact.hasMany(Ticket);
Technician.hasMany(Ticket);

// a Ticket time belongs to only one ticket
TicketComment.belongsTo(Ticket, {constraints: true, onDelete: 'NO ACTION'});
Ticket.hasMany(TicketComment);

// A ticket comment belongs to only one ticket 
TicketTime.belongsTo(Ticket, {constraints: true, onDelete:'NO ACTION'});
Ticket.hasMany(TicketTime);

// An address can belong to anything, and anything can have more than one address
Address.belongsTo(Customer, {constraints: true, onDelete: 'NO ACTION'});
Address.belongsTo(Contact, {constraints: true, onDelete: 'NO ACTION'});
Address.belongsTo(Technician, {constraints: true, onDelete: 'NO ACTION'});
Customer.hasMany(Address)
Contact.hasMany(Address)
Technician.hasMany(Address)

// A ticket history belongs to a ticket and a user
TicketHistory.belongsTo(Ticket, {constraints: true, onDelete: 'NO ACTION'})
TicketHistory.belongsTo(Technician, {constraints: true, onDelete: 'NO ACTION'})
Ticket.hasMany(TicketHistory);
Technician.hasMany(TicketHistory);

// A picture belongs to a customer, contact or a ticket.
Picture.belongsTo(Customer, {constraints: true, onDelete: 'NO ACTION'});
Picture.belongsTo(Ticket, {constraints: true, onDelete:'NO ACTION'});
Picture.belongsTo(Contact, {constraints: true, onDelete:'NO ACTION'});
Customer.hasMany(Picture);
Ticket.hasMany(Picture);
Contact.hasMany(Picture);


// routes
//============================================================
const customerRoutes = require('./routes/customers');
const addressRoutes = require('./routes/addresses');
const contactRoutes = require('./routes/contacts');
const equipmentRoutes = require('./routes/equipment');
const licenseRoutes = require('./routes/licenses');
const pictureRoutes = require('./routes/pictures');
const ticketRoutes = require('./routes/tickets');
const userRoutes = require('./routes/users');

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
// Set up the folder where react will live
app.use(express.static('client'));

//Routes
app.use('/customers', customerRoutes);
app.use('/addresses', addressRoutes);
app.use('/contacts', contactRoutes);
app.use('/equipment', equipmentRoutes);
app.use('/licenses', licenseRoutes);
app.use('/pictures', pictureRoutes);
app.use('/tickets', ticketRoutes);
// app.use('/users', userRoutes);
// app.use('*', catchAllRoutes)

//The default endpoint for the webserver
// app.get('/', (req, res) => {
//     res.render('index.html');
// });




// error handler
app.use((err, req, res, next) => {

    if (err.message.includes("does not exist")) {
        logger.info("The user requested a page that doesn't exist");
        logger.error(err);
        req.flash("error", "That page does not exist. Sending you to the home page.")
        return res.redirect("/")
    }

    if (err.message.includes("EPERM: operation not permitted, unlink")) {
        logger.info("Something happened when unlinking the files");
        logger.error(err);
        req.flash("error", "I was unable to delete that client. Please escalate to the developer.")
        return res.redirect("/")
    }

    if (err.code === 'EBADCSRFTOKEN') {
        logger.info("Someone is using a bad token.");
        logger.error(err);
        req.flash("error", "Your CSRF token was rejected. Please use the system as intended.")
        return res.redirect("/")
    }

    if (err.message.includes('Validation error')) {
        logger.info("Database constraint was violated.");
        logger.error(err);
        err.message = "Database constraint violated";
        req.flash('error', "The unique client identifier is likely already in use. Please try something else.");
        return (res.redirect("/taxwebcentral/clients/new"));
    }
    if (err.module === 'joi') {
        if (err.message.includes("user.repeatPassword")) {
            err.message = "Those passwords do not match."
        }
        if (err.message.includes("user.username")) {
            err.message = "Only a-z and A-Z allowed. "
        }
        logger.info("Something happened in the Joi validation module.");
        logger.error(err);
        req.flash('error', err.message);
        return res.redirect(`${err.page}`);
    }

    // Deal with the oddball ones that have no error message
    if (!err.message) {
        logger.info("The user requested a page that doesn't exist");
        logger.error(err);
        err.message = "Unknown error occured";
    }

    if (err.message.includes('All configured authentication methods failed')) {
        logger.info("Couldn't copy the image file to the remote machine.");
        logger.error(err);
        req.flash('error', "The client was saved, but there was a problem copying the image to the remote machine.");
        return (res.redirect("/taxwebcentral/clients/"));
    }

    logger.info("An error occurred that wasn't planned for.")
    logger.error(err)
    req.flash("error", "Something went wrong that wasn't anticipated. Please escalate to the developer.")
    res.redirect("/")

});






if (process.env.INDEV === "true") {

    db
        .sync({ alter:true })
        .then(result => {
            app.listen(8080, function () {
                console.log(`http fired up on 8080`);
            });

        })
        .catch(error => console.log(error))

} else {
    db
        .sync()
        .then(result => {
            https.createServer(sslOptions, app).listen(process.env.PORT || 443, function () {
                console.log(`https fired up on ${process.env.PORT}`);
            });
            console.log("Fired up https")

        })
        .catch(error => console.log(error))
}






