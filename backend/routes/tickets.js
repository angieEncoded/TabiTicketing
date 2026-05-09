const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket")
const Technician = require("../models/User");
const Contact = require("../models/Contact");
const Customer = require("../models/Customer");
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewCustomer, validateExistingCustomer, validateNewTicket } = require("../util/validationHelpers")
const { Op } = require('sequelize');
const TicketComment = require("../models/TicketComment");
const TicketTime = require("../models/TicketTime");
const TicketHistory = require("../models/TicketHistory");
const User = require("../models/User");
const Project = require("../models/Project");

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


router.get("/:id", async (req ,res ,next) => {
    const {id} = req.params;

    try {
        const ticket = await Ticket.findOne({
            where: { id: id },
            include: [ Customer, Contact, User, Project, TicketComment, TicketHistory, TicketTime]         
        })

        console.log(ticket)
        if (ticket) {
            return res.json({ status: 200, message: "Successfully Fetched", ticket: ticket.dataValues})
        }
        else {
            return res.json({ status: 400, message: "Record does not exist" })
        }
    } catch (error) {
        return res.json({ status: 500, message: error.message })
    }

})



// Add a new ticket
router.post("/:id", validateNewTicket, async (req, res, next) => {

    const data = req.body;

    if(data.contactId === ''){
        data.contactId = null;
    }
    const { id } = req.params;

    try {
        
        const ticket = await Ticket.create({uuid: uuidv4(), customerId: id, ...data});
        return res.json({status: 200, message: "Successfully saved", ticket: ticket });

    } catch (error) {
         return res.json({ status: 500, message: error.message })
    }

})




module.exports = router;