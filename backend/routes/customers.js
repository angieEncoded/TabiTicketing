const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const Address = require("../models/Address");
const Contact = require("../models/Contact");
const Ticket = require("../models/Ticket");
const Equipment = require("../models/Equipment");
const License = require("../models/License");
const Picture = require("../models/Picture");

const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewCustomer, validateExistingCustomer } = require("../util/validationHelpers")

// /customers/*

// fetch all active customers
router.get("/", async (req, res, next) => {
    const customers = await Customer.findAll({ 
        where:{'status': 'Active'}, 
        include: {
            model: Address, 
            where: {
                type: 'Billing'
            },
            required: false
        }
    });
    res.json(customers);
})


// Add a new customer
router.post("/", validateNewCustomer, async (req, res, next) => {
    const data = req.body;
    try {
        const results = await Customer.create({
            uuid: uuidv4(),
            ...data
        })
        return res.json({'status': 200, 'results': results });

    } catch (error) {
        return res.json({ "status": "500", "message": error.message })
    }

})

// grab all the data for a single customer
router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const rows = await Customer.findOne({
            where: {id: id},
            include: [Address, Contact, Equipment, License, Picture, Ticket]
        })
        if (rows) { return res.json(rows.dataValues) }
        else { return res.json({ status: 400, error: "Record does not exist" }) }
    } catch (error) {
        return res.json({ "status": "500", "message": error.message })
    }
})



// Update a single customer
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

// Archive a customer (paranoid delete)

// fetch all active customers
router.get("/testing", async (req, res, next) => {
    const customers = await Customer.findAll({ 
        where:{'status': 'Active'}, 
        include: {
            model: Address, 
            where: {
                type: 'Billing'
            },
            required: false
        }
    });
    res.json(customers);
})




module.exports = router;