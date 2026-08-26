const express = require("express");
const router = express.Router();
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewAddress } = require("../util/validationHelpers")
const Address = require('../models/Address');
const { validateAddressPut } = require("../util/validationHelpers");


// fetch customer report
router.post("/tickets/:customer", async (req, res, next) => {

    // get tickets per customer? Or send in params with a post?
    // easiest way to allow scaling would be to use a form and post

    // customer
    // start date
    // end date
    // type - just tickets, just projects, tickets and projects
    // 


    const {recordType, id} = req.params;

    let results;
 

    return res.json(results);
})



module.exports = router;
