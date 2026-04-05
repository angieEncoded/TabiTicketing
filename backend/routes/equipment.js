const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment")
const { Op } = require('sequelize');
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewCustomer, validateExistingCustomer } = require("../util/validationHelpers")

// /equipment/*

// fetch all active equipment for a customer
router.get("/:customerId", async (req, res, next) => {

    try {
        // Search for equipment that belongs to a customer but not to a contact
        const { customerId } = req.params
    const equipment = await Equipment.findAll({
         where:{
            [Op.and]:
            [
                {'customerId':  customerId},
                {'contactId': null},
                {'technicianId': null}
            ],
        }
    })
    res.json(equipment);
    } catch (error) {
        res.json({status: 'error', error: error})
        console.log(error)
    }



})


module.exports = router;