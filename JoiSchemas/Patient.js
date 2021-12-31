const Joi = require("joi");
const {GENDERS} = require('../utils/constants')

const addPatient = Joi.object({
  name: Joi.string().max(50).required(),
  phoneNo: Joi.number().min(100000000).max(3999999999).required(),
  age: Joi.number().min(0).max(110).required(),
  gender: Joi.string().valid(...GENDERS).required(),

});

const getPatient = Joi.object({
  pageLength: Joi.number().optional(),
  page: Joi.number().optional(),

});
module.exports = {
  addPatient,
  getPatient
};
