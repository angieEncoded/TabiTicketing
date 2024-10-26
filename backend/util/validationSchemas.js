const Joi = require("joi");

module.exports.customerSchema = Joi.object({
    customer_name: Joi.string().required(),
    primary_phone: Joi.string().required(),
    fax: Joi.string().allow(''),
    secondary_phone: Joi.string().allow(''),
    website: Joi.string().required(),
    email:Joi.string().allow(''),
    notes: Joi.string().allow(''),
    billing_address_one: Joi.string().allow(''),
    billing_address_two: Joi.string().allow(''),
    billing_address_city: Joi.string().allow(''),
    billing_address_state: Joi.string().allow(''),
    billing_address_zip: Joi.string().allow(''),
    billing_address_country: Joi.string().allow(''),
    shipping_address_one: Joi.string().allow(''),
    shipping_address_two: Joi.string().allow(''),
    shipping_address_city: Joi.string().allow(''),
    shipping_address_state: Joi.string().allow(''),
    shipping_address_zip: Joi.string().allow(''),
    shipping_address_country: Joi.string().allow(''),
    added_by: Joi.string().allow(''),
    updated_by: Joi.string().allow(''),
    status: Joi.string().required()
});
