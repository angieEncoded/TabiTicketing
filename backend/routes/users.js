const express = require("express");
const router = express.Router();
const User = require("../models/User")
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewUser } = require("../util/validationHelpers")
const { Op } = require('sequelize');

// /users


// fetch all active users who are also technicians
router.get("/technicians", async (req, res, next) => {
    try {
        const technicians = await User.findAll({ where:{
            [Op.and]:
            [
                {'status': "Active"},
                {'is_technician': true}  
            ]
        } });

        // Handle if there are no technicians to fetch
        if(technicians.length < 1){
            return res.json({"status": "500", "message": "There are no technicians to fetch." })
        }
        return res.json({status: 200, message: "Successfully fetched", technicians});
    
    } catch (error) {
        return res.json({ "status": "500", "message": error.message })
    }

})







// Add a new user
router.post('/', validateNewUser, async (req,res,next)=> {

    const data = req.body; 
    console.log(data)

    try {
        user = await User.create({uuid: uuidv4(), ...data})
        return res.json({status: 200, message: "Successfully saved", user: user });

    } catch (error) {
        return res.json({ status: 500, message: error.message })
    }

})


module.exports = router;