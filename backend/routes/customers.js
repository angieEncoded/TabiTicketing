const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const Address = require("../models/Address");
const Contact = require("../models/Contact");
const Ticket = require("../models/Ticket");
const Equipment = require("../models/Equipment");
const License = require("../models/License");
const Picture = require("../models/Picture");
const Project = require("../models/Project");
const User = require("../models/User");
const { Op } = require('sequelize');
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewCustomer, validateExistingCustomer, validateCustomerPut } = require("../util/validationHelpers")

// /customers/*

// fetch all active customers
router.get("/", async (req, res, next) => {

    try {
        const customers = await Customer.findAll({
            where: { 'status': 'Active' },
            include: {
                model: Address,
                where: {
                    type: 'BILLING'
                },
                required: false
            }
        });

        // Handle if there are no technicians to fetch
        if (customers.length < 1) {
            return res.json({ status: "500", message: "There are no customers to fetch." })
        }
        return res.json({ status: 200, message: "Successfully fetched", customers });

    } catch (error) {
        return res.json({ status: "500", message: error.message })
    }

})


// Add a new customer
router.post("/", validateNewCustomer, async (req, res, next) => {
    const data = req.body;
    try {
        const customer = await Customer.create({
            uuid: uuidv4(),
            ...data
        })
        return res.json({ status: 200, message: "Successfully Added", customer: customer });

    } catch (error) {
        return res.json({ status: 500, message: error.message })
    }

})





// grab all the data for a single customer
router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findOne({
            where: { id: id },
            include: [
                {model: Ticket, where:{ status:  { [Op.ne]: 'CLOSED' }}, include: [User], required: false}, // required false to prevent fail in querying with empty values
                Address, Contact, Equipment, License, Picture, Project
            ]        
        })


        if (customer) {

            return res.json({ status: 200, message: "Successfully Fetched", customer: customer.dataValues})

        }
        else {

            return res.json({ status: 400, message: "Record does not exist" })
        }
    } catch (error) {
        return res.json({ status: 500, message: error.message })
    }
})


// Update a customer
router.put("/:id", validateCustomerPut, async (req, res, next) => {

    console.log("got into the put")
    const data = req.body;
    console.log(data)
    if (data.contactId === '') {
        data.contactId = null;
    }

    const { id } = req.params;

    try {

        const customer = await Customer.update(
            { ...data },
            {
                where:
                    { id: id }
            }
        );

        return res.json({ status: 200, message: "Successfully updated", customer: customer });

    } catch (error) {
        return res.json({ status: 500, message: error.message })
    }

})


module.exports = router;