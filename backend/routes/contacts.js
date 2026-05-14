const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact")
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewContact } = require("../util/validationHelpers")

// /contacts

// Fetch all active contacts
router.get("/", async (req, res, next) => {

    const { customerId } = req.params
    try {
        const contacts = await Contact.findAll({ where:{'status':  'ACTIVE'} });
     
        if(contacts.length < 1){
            return res.json({status: 500, message: "There are no contacts to fetch." })
        }

        return res.json({status: 200, message: "Successfully fetched", contacts: contacts});
        
    } catch (error) {
        return res.json({ status: 500, message: error.message })
    }

})


// fetch all active contacts for a customer
router.get("/:customerId", async (req, res, next) => {

    const { customerId } = req.params
    try {
        const contacts = await Contact.findAll({ where:{'customerId':  customerId} });
        if(contacts.length < 1){
            return res.json({status: 500, message: "There are no contacts to fetch for this customer." })
        }

        return res.json({status: 200, message: "Successfully fetched", contacts:contacts});
        
    } catch (error) {
        return res.json({ status: 500, message: error.message })
    }

})


// Add a new contact
router.post('/:recordType/:id', validateNewContact, async (req,res,next)=> {

    const data = req.body;
    const {recordType, id} = req.params;

    try {
        
        if(recordType === 'customer'){ 
            const customerContacts = await Contact.create({uuid: uuidv4(), customerId: id, ...data})
            return res.json({status: 200, message: "Successfully saved", customerContacts: customerContacts });
        }

        return res.json({status: 200, message: "You reached the server, but there was no command to execute" });

    } catch (error) {
         return res.json({ status: 500, message: error.message })
    }

})



module.exports = router;