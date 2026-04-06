const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket")
const Technician = require("../models/Technician");
const Contact = require("../models/Contact");
const Customer = require("../models/Customer");
const {Op} = require('sequelize');
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewCustomer, validateExistingCustomer } = require("../util/validationHelpers")

// /tickets


// Fetch all open tickets
router.get("/", async (req, res, next) => {

    const tickets = await Ticket.findAll({ 
        where:{           
                'status': {
                    [Op.ne]: 'CLOSED'
                }

        },
        include: [Technician, Contact, Customer]
    });
    res.json(tickets);
})



// fetch all active tickets for a customer
router.get("/:customerId", async (req, res, next) => {

    const { customerId } = req.params
    const tickets = await Ticket.findAll({ 
        where:{
            [Op.and]:
            [
                {'customerId':  customerId},
                {'status': {
                    [Op.ne]: 'CLOSED'
                }
            }
            ],
        },
        include: [Technician, Contact]
    });
    res.json(tickets);
})


module.exports = router;