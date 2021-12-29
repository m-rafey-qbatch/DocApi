const Joi = require("joi");

const addDoctor = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  email: Joi.string().email().required(),

});

const getDoctor = Joi.object({
  pageLength: Joi.number().optional(),
  pageNumber: Joi.number().optional(),

});
module.exports = {
  addDoctor,
  getDoctor
};
 