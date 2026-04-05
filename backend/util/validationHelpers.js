const { customerSchema, addressSchema } = require("./validationSchemas");


module.exports.validateNewCustomer = (req, res, next) => {
    const { error } = customerSchema.validate(req.body);
    if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({"error": message})
    } else {
        next();
    }
}

module.exports.validateNewAddress = (req, res, next) => {
    const { error } = addressSchema.validate(req.body);
    if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({"error": message})
    } else {
        next();
    }
}


module.exports.validateExistingCustomer = (req, res, next) => {
    const { error } = customerSchema.validate(req.body);
    if (error) {
        const message = error.details.map((element) => element.message).join(",");
        return res.json({"error": message})
    } else {
        next();
    }
}