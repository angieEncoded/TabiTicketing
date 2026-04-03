const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer")
const logger = require('../util/logger');
const db = require('../models/Customer')
const { v4: uuidv4 } = require('uuid');
const { validateNewCustomer, validateExistingCustomer } = require("../util/validationHelpers")

// /customers/*

router.get("/", async (req, res, next) => {
    const [customers] = await Customer.fetchActive();
    res.json(customers)
})

router.post("/", validateNewCustomer, async (req, res, next) => {

    const data = req.body;

    try {
        
        const results = await Customer.create({
        uuid: uuidv4(),
        customer_name: data.customer_name,
        primary_phone: data.primary_phone,
        secondary_phone: data.secondary_phone,
        fax: data.fax,
        website: data.website,
        email: data.email,
        notes: data.notes,
        status: data.status,
        county: data.county,
        billing_one: data.billing_one,
        billing_two: data.billing_two,
        billing_city: data.billing_city,
        billing_state: data.billing_state,
        billing_zip: data.billing_zip,
        billing_country: data.country,
        shipping_one: data.shipping_one,
        shipping_two: data.shipping_two,
        shipping_city: data.shipping_city,
        shipping_state: data.shipping_state,
        shipping_zip: data.shipping_zip,
        shipping_country: data.country,
        added_by: 'SYSTEM', //!!! Update to logged in user when logic built
        updated_by: 'SYSTEM'
        })

        console.log(results)


    } catch (error) {
        console.log(error)
    }



})

router.get("/:id", async (req, res, next) => {

    try {
        const id = req.params.id;
        const [rows] = await Customer.findById(id);

        if (rows && rows.length) {
            return res.json(rows[0])
        }

        else {
            return res.json({ status: 400, error: "Record does not exist" })
        }

    } catch (error) {
        return res.json({ "status": "500", "message": error.message })
    }

})

router.put("/:id", validateExistingCustomer, async (req, res, next) => {

    try {
        const id = req.params.id;
        const customer = req.body;
        const country = "United States";

        // make sure the record exists
        const [row] = await Customer.findById(id);
        if (row && row.length) {
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
                customer.billing_one,
                customer.billing_two,
                customer.billing_city,
                customer.billing_state,
                customer.billing_zip,
                country,
                customer.shipping_one,
                customer.shipping_two,
                customer.shipping_city,
                customer.shipping_state,
                customer.shipping_zip,
                country,
                null,
                "SYSTEMUPDATE",
                null,
                null,
                customer.status
            )

            const results = await updatedRecord.updateCustomer();
            return res.json({ "status": "200", "message": "Successfully saved the record" })

        } else {
            return res.json({ "status": "400", "message": "Record not found" })
        }
    } catch (error) {
        return res.json({ "status": "500", "error": error.message })
    }
})


module.exports = router;