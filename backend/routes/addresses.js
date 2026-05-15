const express = require("express");
const router = express.Router();
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewAddress } = require("../util/validationHelpers")
const Address = require('../models/Address');
const { validateAddressPut } = require("../util/validationHelpers");

// fetch all addresses for a customer
router.get("/:recordType/:id", async (req, res, next) => {

    const {recordType, id} = req.params;
    let results;
    if (recordType === 'customer') { results = await Address.findAll({ where:{'customerId': id} });}
    if (recordType === 'contact') { results = await Address.findAll({ where:{'contactId': id} });}
    if (recordType === 'technician') { results = await Address.findAll({ where:{'technicianId': id} });}

    return res.json(results);
})



// Add new address
router.post('/:recordType/:id', validateNewAddress, async (req,res,next)=> {

    const data = req.body;
    const {recordType, id} = req.params;
    try {
        
        if(recordType === 'customer'){ 
            const customerAddress = await Address.create({uuid: uuidv4(), customerId: id, ...data})
            return res.json({status: 200, message: "Successfully saved", customerAddress: customerAddress });
        }

        return res.json({status: 200, message: "You reached the server, but there was no command to execute" });

    } catch (error) {
         return res.json({ status: "500", message: error.message })
    }

})

// Update an address
router.put("/:id", validateAddressPut, async (req, res, next) => {

  
    const data = req.body;

    if (data.contactId === '') {
        data.contactId = null;
    }

    const { id } = req.params;

    try {

        const address = await Address.update(
            { ...data },
            {
                where:
                    { id: id }
            }
        );

        return res.json({ status: 200, message: "Successfully updated", address: address });

    } catch (error) {
        return res.json({ status: 500, message: error.message })
    }

})









module.exports = router;