const express = require("express");
const router = express.Router();
const License = require("../models/License")
const { Op } = require('sequelize');
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewLicense } = require("../util/validationHelpers")
const multer  = require('multer')
const fs = require('fs');
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    const customer_name = req.body.customer_name || 'unknown'; 
    const dir = `./uploads/license_files/${customer_name}`;
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const fileName = `${uuidv4()}_${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage:storage, fileFilter:(req, file, cb) => {
  
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'text/plain', 'application/pdf'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true); // Accept
    } else {
      // throw error 415 not acceptable media type
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, TEXT and PDF are allowed.'), false); // Reject
    } 
}
})


// fetch all active equipment for a customer
router.get("/:customerId", async (req, res, next) => {

    try {
        // Search for licenses that belongs to a customer but not to a contact
    const { customerId } = req.params
    const license = await License.findAll({
         where:{
            [Op.and]:
            [
                {'customerId':  customerId},
                {'contactId': null},
                {'technicianId': null},
            ],
        }
    })
    res.json(license);
    } catch (error) {
      console.log("in the catch")
        res.json({status: 'error', error: error})
        
    }
})


// Add a new license
router.post('/:recordType/:id', upload.single('license_file'), validateNewLicense, async (req, res, next)=> {

    const filename = req.file.filename;
    const data = req.body;
    const {recordType, id} = req.params;
    // Need to process some of this data
    if(req.file){data.license_file = req.file.filename}
    if(data.sold_date === ''){data.sold_date = null}
    if(data.purchase_date === ''){data.purchase_date = null}
    if(data.expires === ''){ data.expires = null}
    if(data.end_of_life === ''){ data.end_of_life = null}
    let results;

    try {
        
        if(recordType === 'customer'){ 
            results = await License.create({uuid: uuidv4(), customerId: id, ...data})
        }

        return res.json({'status': 200, 'results': results });

    } catch (error) {
      if(req.file){
          fs.unlink(req.file.path, error => {
              console.log(error)
          });
      }
      return res.json({ "status": "500", "message": error.message })
    }

})






module.exports = router;