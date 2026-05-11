const Joi = require("joi");
const { ticketSchema } = require("./validationSchemas");

// Create a partial schema where all keys are optional
module.exports.ticketPutSchema = ticketSchema.fork(Object.keys(ticketSchema.describe().keys), (schema) => schema.optional());
