const Joi = require("joi");
const { ticketSchema, customerSchema, addressSchema } = require("./validationSchemas");

// Create a partial schema where all keys are optional
module.exports.ticketPutSchema = ticketSchema.fork(Object.keys(ticketSchema.describe().keys), (schema) => schema.optional());
module.exports.customerPutSchema = customerSchema.fork(Object.keys(customerSchema.describe().keys), (schema) => schema.optional());
module.exports.addressPutSchema = addressSchema.fork(Object.keys(addressSchema.describe().keys), (schema) => schema.optional());




