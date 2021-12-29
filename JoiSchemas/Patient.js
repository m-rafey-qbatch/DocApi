const Joi = require("joi");

const addPatient = Joi.object({
  name: Joi.string().length(50).required(),
  phoneNo: Joi.number().required(),
  age: Joi.number().min(18).max(110).required(),
  gender: Joi.string().required(),

});

const getPatient = Joi.object({
  pageLength: Joi.number().optional(),
  pageNumber: Joi.number().optional(),

});
module.exports = {
  addPatient,
  getPatient
};
