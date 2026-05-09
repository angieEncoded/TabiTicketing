const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket")
const Technician = require("../models/User");
const Contact = require("../models/Contact");
const Customer = require("../models/Customer");
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewCustomer, validateExistingCustomer, validateNewTicket, validateStartTicketTask } = require("../util/validationHelpers")
const { Op, where } = require('sequelize');
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

// Fetch single ticket
router.get("/:id", async (req ,res ,next) => {
    const {id} = req.params;

    try {
        const ticket = await Ticket.findOne({
            where: { id: id },
            include: [ 
                Customer, Contact, User, Project, TicketComment, TicketHistory,
                {model: TicketTime, where:{ status:  { [Op.ne]: 'CLOSED' }}, include: [User], required: false} ]  
        })

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


// Add a new ticket for a customer
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

// Add a new ticket time for a ticket
router.post("/startTicketTask/:id", validateStartTicketTask, async(req, res, next) => {

    const data = req.body;
    const { id } = req.params;

    if(data.contactId === ''){
        data.contactId = null;
    }

    const now = new Date();
    console.log(now)

    try {
        
        // Add the ticket time
        const ticketTime = await TicketTime.create({
            uuid: uuidv4(), 
            ...data,
            start_time: now,
            status: 'OPEN', 
            ticketId : id,
        });

        return res.json({status: 200, message: "Successfully saved start task.", ticketTime: ticketTime });

    } catch (error) {
                console.log(error)
         return res.json({ status: 500, message: error.message })
    }

})

// Add a new ticket time for a ticket
router.put("/endTicketTask/:id", validateStartTicketTask, async(req, res, next) => {

    const { id } = req.params;
    const now = new Date();

    try {
        const ticketTime = await TicketTime.update(
            {
                end_time: now,
                status: 'CLOSED',
            },
            {
                where: {id : id}
            }             
    );
        return res.json({status: 200, message: "Successfully closed task.", ticketTime: ticketTime });

    } catch (error) {
                console.log(error)
         return res.json({ status: 500, message: error.message })
    }

})




module.exports = router;