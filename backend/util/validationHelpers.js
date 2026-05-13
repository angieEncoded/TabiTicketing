const { customerSchema, 
    addressSchema, 
    equipmentSchema, 
    contactSchema, 
    licenseSchema, 
    pictureSchema, 
    technicianSchema, 
    userSchema, 
    ticketSchema, 
    startTicketTaskSchema, 
    ticketCommentSchema
} = require("./validationSchemas");
const { 
    ticketPutSchema, 
    customerPutSchema, 
    addressPutSchema
} = require("../util/validationSchemaForks");
const fs = require("fs");

module.exports.validateNewCustomer = (req, res, next) => {
    const { error } = customerSchema.validate(req.body);
    if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({status: 400, message: message })
    } else {
        next();
    }
}

module.exports.validateNewAddress = (req, res, next) => {
    const { error } = addressSchema.validate(req.body);
    if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({status: 400, message: message })
    } else {
        next();
    }
}

module.exports.validateAddressPut = (req, res, next) => {
    const { error } = addressPutSchema.validate(req.body);
    if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({status: 400, message: message })
    } else {
        next();
    }
}

module.exports.validateExistingCustomer = (req, res, next) => {
    const { error } = customerSchema.validate(req.body);
    if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({status: 400, message: message })
    } else {
        next();
    }
}

module.exports.validateNewEquipment = (req, res, next) => {
    const { error } = equipmentSchema.validate(req.body);
        if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({status: 400, message: message })
    } else {
        next();
    }
}

module.exports.validateNewContact = (req, res, next) => {
    const { error } = contactSchema.validate(req.body);
        if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({status: 400, message: message })
    } else {
        next();
    }
}

module.exports.validateNewLicense = (req, res, next) => {

    const data = {
        ...req.body,
        license_file: req.file
    };

    const { error } = licenseSchema.validate(data);

    if (error) {
        if(req.file){
            fs.unlink(req.file.path, error => {
                console.log(error)
            });
        }
        const message = error.details.map((element) => element.message).join(",");
        return res.json({status: 400, message: message })
    } else {
        next();
    }
}

module.exports.validateNewPicture = (req, res, next) => {

    const data = {
        ...req.body,
        picture_file: req.file
    };

    const { error } = pictureSchema.validate(data);

    if (error) {
        if(req.file){
            fs.unlink(req.file.path, error => {
                console.log(error)
            });
        }
        const message = error.details.map((element) => element.message).join(",");
        return res.json({status: 400, message: message })
    } else {
        next();
    }
}


module.exports.validateNewUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
        if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({status: 400, message: message })
    } else {
        next();
    }
}


module.exports.validateNewTicket = (req, res, next) => {
    const { error } = ticketSchema.validate(req.body);
        if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({status: 400, message: message })
    } else {
        next();
    }
}

module.exports.validateTicketPut = (req, res, next) => {
    const { error } = ticketPutSchema.validate(req.body, { stripUnknown: true });
        if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({status: 400, message: message })
    } else {
        next();
    }
}

module.exports.validateCustomerPut = (req, res, next) => {
    const { error } = customerPutSchema.validate(req.body, { stripUnknown: true });
        if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({status: 400, message: message })
    } else {
        next();
    }
}



module.exports.validateStartTicketTask = (req, res, next) => {
    const { error } = startTicketTaskSchema.validate(req.body);
        if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({status: 400, message: message })
    } else {
        next();
    }
}

module.exports.validateTicketComment = (req, res, next) => {
    const { error } = ticketCommentSchema.validate(req.body);
        if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({status: 400, message: message })
    } else {
        next();
    }
}