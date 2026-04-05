const express = require("express");
const router = express.Router();
const Picture = require("../models/Picture")
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewCustomer, validateExistingCustomer } = require("../util/validationHelpers")

// /pictures/*

// fetch all active equipment for a customer
router.get("/:customerId", async (req, res, next) => {

    try {
        // Search for licenses that belongs to a customer but not to a contact
    const { customerId } = req.params
    const pictures = await Picture.findAll({
         where: {'customerId':  customerId} })
    res.json(pictures);
    } catch (error) {
        res.json({status: 'error', error: error})
        console.log(error)
    }

})


module.exports = router;