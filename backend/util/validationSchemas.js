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

module.exports.equipmentSchema = Joi.object({
    equipment_type: Joi.string().required(),
    vendor: Joi.string().required(),
    model: Joi.string().required(),
    os_type: Joi.string().allow(''),
    os_version: Joi.string().allow(''),
    purchase_date: Joi.date().allow(''),
    sold_date: Joi.date().allow(''),
    install_date: Joi.date().allow(''),
    end_of_life: Joi.date().allow(''),
    warranty_expires: Joi.date().allow(''),
    internal_ip_address: Joi.string().allow(''),
    external_ip_address: Joi.string().allow(''),
    subnet_mask: Joi.string().allow(''),
    gateway: Joi.string().allow(''),
    primary_dns: Joi.string().allow(''),
    secondary_dns: Joi.string().allow(''),
    tertiary_dns: Joi.string().allow(''),
    serial_number: Joi.string().required(),
    service_tag: Joi.string().allow(''),
    notes: Joi.string().allow(''),
    added_by: Joi.string().required(),
    updated_by: Joi.string().required(),
})

module.exports.contactSchema = Joi.object({
    salutation: Joi.string().allow(''),
    first_name: Joi.string().required(),
    middle_name: Joi.string().allow(''),
    last_name: Joi.string().required(),
    work_phone: Joi.string().required(),
    extension: Joi.string().allow(''),
    cell_phone: Joi.string().allow(''),
    fax: Joi.string().allow(''),
    job_title: Joi.string().required(),
    email: Joi.string().allow(''),
    notes: Joi.string().allow(''),
    added_by: Joi.string().required(),
    updated_by: Joi.string().required(),
})


module.exports.licenseSchema = Joi.object({
    product_name: Joi.string().required(),
    vendor_name: Joi.string().required(),
    sold_date: Joi.date().allow(''),
    purchase_date: Joi.date().allow(''),
    expires: Joi.date().allow(''),
    license_key: Joi.string().allow(''),
    email_of_record: Joi.string().allow(''),
    end_of_life: Joi.date().allow(''),
    notes: Joi.string().allow(''),
    customer_name: Joi.string().required(),
    license_file: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain').required(),
        size: Joi.number().max(5 * 1024 * 1024).required(), // 5MB limit
    }).unknown(true), // Allow other multer properties
    added_by: Joi.string().required(),
    updated_by: Joi.string().required(),
})

module.exports.pictureSchema = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().allow(''),
    notes: Joi.string().allow(''),
    customer_name: Joi.string().required(),
    picture_file: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
        size: Joi.number().max(10 * 1024 * 1024).required(), // 10MB limit
    }).unknown(true), // Allow other multer properties
    added_by: Joi.string().required(),
    updated_by: Joi.string().required(),
})
