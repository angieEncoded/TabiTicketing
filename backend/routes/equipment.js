const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment")
const { Op } = require('sequelize');
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewEquipment } = require("../util/validationHelpers")

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
    }

})


// Add new equipment
router.post('/:recordType/:id', validateNewEquipment, async (req,res,next)=> {

    const data = req.body;
    const {recordType, id} = req.params;
    let results;

    // Need to process some of this data
    if(data.sold_date === ''){data.sold_date = null}
    if(data.purchase_date === ''){data.purchase_date = null}
    if(data.warranty_expires === ''){ data.warranty_expires = null}
    if(data.end_of_life === ''){ data.end_of_life = null}
    if(data.install_date === ''){ data.install_date = null}


    try {
        
        if(recordType === 'customer'){ 
            results = await Equipment.create({uuid: uuidv4(), customerId: id, ...data})
        }

        // Not implemented
        // if(recordType === 'contact'){ results = await Equipment.create({uuid: uuidv4(), contactId: id, ...data})}
        // if(recordType === 'technician'){ results = await Equipment.create({uuid: uuidv4(), technicianId: id, ...data})}

        return res.json({'status': 200, 'results': results });

    } catch (error) {
         return res.json({ "status": "500", "message": error.message })
    }

})




module.exports = router;