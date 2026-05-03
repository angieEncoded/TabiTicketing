const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact")
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewContact } = require("../util/validationHelpers")

// /contacts

// fetch all active contacts for a customer
router.get("/:customerId", async (req, res, next) => {

    const { customerId } = req.params
    const contacts = await Contact.findAll({ where:{'customerId':  customerId} });
    res.json(contacts);

})


// Add a new contact
router.post('/:recordType/:id', validateNewContact, async (req,res,next)=> {

    const data = req.body;
    const {recordType, id} = req.params;
    let results;

    try {
        
        if(recordType === 'customer'){ 
            results = await Contact.create({uuid: uuidv4(), customerId: id, ...data})

        }

        return res.json({'status': 200, 'results': results });

    } catch (error) {
         return res.json({ "status": "500", "message": error.message })
    }

})



module.exports = router;