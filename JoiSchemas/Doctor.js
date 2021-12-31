const Joi = require("joi");

const addDoctor = Joi.object({
  name: Joi.string().max(50).required(),
  age: Joi.number().min(18).max(110).required(),
  email: Joi.string().email().required(),

});

const getDoctor = Joi.object({
  pageLength: Joi.number().optional(),
  page: Joi.number().optional(),

});
module.exports = {
  addDoctor,
  getDoctor
};
 