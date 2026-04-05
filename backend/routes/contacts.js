const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact")
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewCustomer, validateExistingCustomer } = require("../util/validationHelpers")

// /contacts

// fetch all active contacts for a customer
router.get("/:customerId", async (req, res, next) => {

    const { customerId } = req.params
    const contacts = await Contact.findAll({ where:{'customerId':  customerId} });
    res.json(contacts);

})


module.exports = router;