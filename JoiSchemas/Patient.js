const Joi = require("joi");

const addPatient = Joi.object({
  name: Joi.string().max(50).required(),
  phoneNo: Joi.number().min(100000000).max(3999999999).required(),
  age: Joi.number().min(0).max(110).required(),
  gender: Joi.string().valid('male','female','other').required(),

});

const getPatient = Joi.object({
  pageLength: Joi.number().optional(),
  pageNumber: Joi.number().optional(),

});
module.exports = {
  addPatient,
  getPatient
};
