const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket")
const Technician = require("../models/User");
const Contact = require("../models/Contact");
const Customer = require("../models/Customer");
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewCustomer, validateExistingCustomer, validateNewTicket, validateStartTicketTask, validateTicketComment } = require("../util/validationHelpers")
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



router.get('/testing/:id', async(req, res, next) => {
 
    const {id} = req.params;

    const ticketTime = await TicketTime.findByPk(id);
    const startTime = new Date(ticketTime.start_time)
    const endTime = new Date(ticketTime.end_time);
    const difference = Math.round((endTime - startTime) / (1000 * 60)); // get the difference in minutes and round it

    // get the details from the ticket
    const ticket = await Ticket.findByPk(ticketTime.ticketId);
    const currentMinutes = ticket.ticket_time;
    const runningTotal = currentMinutes + difference;

    // Post the new details back to the ticket
    const timeResults = await Ticket.update(
            {
                ticket_time: timeResults,
            },
            {
                where: {id : ticketTime.ticketId}
            }   
    )





    return res.send("done")

        // Calculate the total time spent

        // Write that to the Ticket record

})



// Fetch single ticket
router.get("/:id", async (req ,res ,next) => {
    const {id} = req.params;

    try {
        const ticket = await Ticket.findOne({
            where: { id: id },
            include: [ 
                Customer, Contact, User, Project, TicketHistory,
                {model: TicketTime, where:{ status:  { [Op.ne]: 'CLOSED' }}, include: [User], required: false},
                {model: TicketComment, include: [User], required: false},
            ]  
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
        
        const ticket = await Ticket.create({uuid: uuidv4(), customerId: id, ticket_time: 0, ...data});
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
         return res.json({ status: 500, message: error.message })
    }

})

// End the ticket time for a ticket
router.put("/endTicketTask/:id", validateStartTicketTask, async(req, res, next) => {

    const { id } = req.params;
    const now = new Date();

    try {
        // Close out the task 
        const ticketTime = await TicketTime.update(
            {
                end_time: now,
                status: 'CLOSED',
            },
            {
                where: {id : id}
            }             
        );

        // Re-fetch the task with the completed information
        const getTicketTime = await TicketTime.findByPk(id);
        const startTime = new Date(getTicketTime.start_time)
        const endTime = new Date(getTicketTime.end_time);
        const difference = Math.round((endTime - startTime) / (1000 * 60)); // get the difference in minutes and round it

        // get the details from the ticket so we know how much time is already there
        const ticket = await Ticket.findByPk(getTicketTime.ticketId);
        const currentMinutes = ticket.ticket_time;
        const runningTotal = currentMinutes + difference;

        // Post the new details back to the ticket
        const timeResults = await Ticket.update(
                {
                    ticket_time: runningTotal,
                },
                {
                    where: {id : getTicketTime.ticketId}
                }   
        )

        return res.json({status: 200, message: "Successfully closed task.", ticketTime: ticketTime });

    } catch (error) {
         return res.json({ status: 500, message: error.message })
    }

})



// Post a new comment
router.post("/comment/:id", validateTicketComment, async (req, res, next) => {

    const data = req.body;
    const { id } = req.params;

    if(data.contactId === ''){
        data.contactId = null;
    }

    try {
        
        // Add the ticket time
        const ticketComment = await TicketComment.create({
            uuid: uuidv4(), 
            ...data,
            ticketId : id,
        });

        return res.json({status: 200, message: "Successfully saved your comment.", ticketComment: ticketComment });

    } catch (error) {
         return res.json({ status: 500, message: error.message })
    }
})





module.exports = router;