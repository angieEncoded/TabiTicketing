require('dotenv').config()
const express = require('express');
// const User = require('./models/User');
const Customer = require("./models/Customer")
const cors = require('cors');
const logger = require('./util/logger');
const app = express();
const { v4: uuidv4 } = require('uuid');
const { validateNewCustomer, validateExistingCustomer } = require("./util/validationHelpers")



app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
// Set up the folder where react will live
app.use(express.static('client'));


//The default endpoint for the webserver
app.get("/", (req, res) => {
    res.render('index.html');
});

// todo - factor this out into its ouwn route
app.get("/customers", async (req, res, next) => {
    const [customers] = await Customer.fetchActive();
    res.json(customers)
})

app.post("/customers", validateNewCustomer, async(req, res, next) => {

    console.log(req.body)

    try {
        const country = "United States";
        const customer = req.body;

        const newCustomer = new Customer(
            null,
            uuidv4(),
            customer.customer_name,
            customer.primary_phone,
            customer.fax,
            customer.secondary_phone,
            customer.website,
            customer.email,
            customer.notes,
            customer.billing_address_one,
            customer.billing_address_two,
            customer.billing_address_city,
            customer.billing_address_state,
            customer.billing_address_zip,
            country,
            customer.shipping_address_one,
            customer.shipping_address_two,
            customer.shipping_address_city,
            customer.shipping_address_state,
            customer.shipping_address_zip,
            country,
            "SYSTEM",
            "SYSTEM",
            null,
            null,
            customer.status
        )
        const results = await newCustomer.save() // get the id out of the return value
        return res.json({ "status": "200", "id": results[0].insertId })

    } catch (error) {
        console.log(error)
        return res.json({ "success": false, "error": error.message})

    }

})

app.get("/customers/:id", async(req,res,next) => {

    try {
        const id = req.params.id;
        const [rows] = await Customer.findById(id);

        if (rows && rows.length) {
            return res.json(rows[0])
        }

        else {
            return res.json({status: 400, error: "Record does not exist"})
        }

    } catch (error) {
        return res.json({"status": "500", "message": error.message})
    }

})

app.put("/customers/:id", validateExistingCustomer, async(req,res,next) => {1

    try {
        const id = req.params.id;
        const customer = req.body;
        const country = "United States";

        // make sure the record exists
        const [row] = await Customer.findById(id);
        if(row && row.length){
            const updatedRecord = new Customer(
                id,
                null,
                customer.customer_name,
                customer.primary_phone,
                customer.fax,
                customer.secondary_phone,
                customer.website,
                customer.email,
                customer.notes,
                customer.billing_address_one,
                customer.billing_address_two,
                customer.billing_address_city,
                customer.billing_address_state,
                customer.billing_address_zip,
                country,
                customer.shipping_address_one,
                customer.shipping_address_two,
                customer.shipping_address_city,
                customer.shipping_address_state,
                customer.shipping_address_zip,
                country,
                null,
                "SYSTEMUPDATE",
                null,
                null,
                customer.status
            )

            const results = await updatedRecord.updateCustomer();
            return res.json({"status": "200", "message": "Successfully saved the record"})

        } else {
            return res.json({"status": "400", "message":"Record not found"})
        }
    } catch (error) {
        return res.json({"status": "500", "error": error.message})
    }












})






app.get("/users", async (req, res, next) => {
    const [users] = await Customer.fetchAll();
    res.send(users)
})



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
