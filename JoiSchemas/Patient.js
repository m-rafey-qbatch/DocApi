const Joi = require("joi");

const addPatient = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
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
