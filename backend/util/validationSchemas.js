const Joi = require("joi");

module.exports.customerSchema = Joi.object({
    customer_name: Joi.string().required(),
    primary_phone: Joi.string().required(),
    secondary_phone: Joi.string().allow(''),
    fax: Joi.string().allow(''),
    website: Joi.string().allow(''),
    email:Joi.string().allow(''),
    notes: Joi.string().allow(''),
    status: Joi.string().required(),
    added_by: Joi.string().required(),
    updated_by: Joi.string().required(),
});


module.exports.addressSchema = Joi.object({
    type: Joi.string().required(),
    street1: Joi.string().required(),
    street2:  Joi.string().allow(''),
    city:  Joi.string().required(),
    county:  Joi.string().allow(''),
    state:  Joi.string().required(),
    zip:  Joi.string().required(),
    country:  Joi.string().required(),
    added_by: Joi.string().required(),
    updated_by: Joi.string().required(),
})
