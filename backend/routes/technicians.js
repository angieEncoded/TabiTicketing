const express = require("express");
const router = express.Router();
const Technician = require("../models/Technician")
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewTechnician } = require("../util/validationHelpers")

// /technicians

// fetch all active technicians
router.get("/", async (req, res, next) => {
    try {
        const technicians = await Technician.findAll({ where:{'status': "ACTIVE"} });
        res.json(technicians); 
    } catch (error) {
        return res.json({ "status": "500", "message": error.message })
    }

})


// Add a new technican
router.post('/', validateNewTechnician, async (req,res,next)=> {

    const data = req.body;

    try {
        results = await Technician.create({uuid: uuidv4(), ...data})
        return res.json({'status': 200, 'results': results });
    } catch (error) {
         return res.json({ "status": "500", "message": error.message })
    }

})



module.exports = router;