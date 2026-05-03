const express = require("express");
const router = express.Router();
const Picture = require("../models/Picture")
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewCustomer, validateExistingCustomer, validateNewPicture } = require("../util/validationHelpers")
const multer  = require('multer')
const fs = require('fs');
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    const customer_name = req.body.customer_name || 'unknown'; 
    const dir = `./uploads/pictures/${customer_name}`;
 
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
  
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true); // Accept
    } else {
      // throw error 415 not acceptable media type
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false); // Reject
    } 
}
})



// Add a new Picture
router.post('/:recordType/:id', upload.single('picture_file'), validateNewPicture, async (req, res, next)=> {

    const filename = req.file.filename;
    const data = req.body;
    const {recordType, id} = req.params;

    // Process some of the data
    if(req.file){data.picture_file = req.file.filename}


    try {
        if(recordType === 'customer'){ 

            customerPicture = await Picture.create({uuid: uuidv4(), customerId: id, ...data})
            return res.json({status: 200, message: "Successfully saved", customerPicture: customerPicture });
        }

        return res.json({status: 200, message: "You reached the server, but there was no command to execute" });

    } catch (error) {
        if(req.file){
            fs.unlink(req.file.path, error => {console.log(error)});
        }
         return res.json({ status: 500, message: error.message })
    }

})


module.exports = router;