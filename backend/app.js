require('dotenv').config()
const express = require('express');
const cors = require('cors');
const logger = require('./util/logger');
const app = express();
const db = require('./util/database');

// routes
const customerRoutes = require('./routes/customers');
const userRoutes = require('./routes/users');


app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
// Set up the folder where react will live
app.use(express.static('client'));

//Routes
// app.use('/customers', customerRoutes);
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



// start up the server and sync all the tables as needed
db
    .sync()
    .then(result => {
        // console.log(result);
        if (process.env.INDEV === "true") {
            app.listen(8080, function () {
                console.log(`http fired up on 8080`);
            });
        } else {
            https.createServer(sslOptions, app).listen(process.env.PORT || 443, function () {
                console.log(`https fired up on ${process.env.PORT}`);
            });
            console.log("Fired up https")
        }


    })
    .catch(error => console.log(error))



