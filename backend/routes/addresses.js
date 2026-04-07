const express = require("express");
const router = express.Router();
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewAddress } = require("../util/validationHelpers")
const Address = require('../models/Address');




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
    let results;
    console.log(recordType) 

    console.log("got here")

    try {
        
        if(recordType === 'customer'){ 
             console.log("in the right block")
            results = await Address.create({uuid: uuidv4(), customerId: id, ...data})
            console.log(results)
        }

        // may need to get the customer information in a query first and then add it here, if we even do addresses for contacts
        if(recordType === 'contact'){ results = await Address.create({uuid: uuidv4(), contactId: id, ...data})}


        if(recordType === 'technician'){ results = await Address.create({uuid: uuidv4(), technicianId: id, ...data})}

        return res.json({'status': 200, 'results': results });

    } catch (error) {
        console.log(error)
         return res.json({ "status": "500", "message": error.message })
    }

})









module.exports = router;