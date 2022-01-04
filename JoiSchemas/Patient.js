const Joi = require("joi");
const { GENDERS } = require("../utils/constants");

const addPatient = Joi.object({
  name: Joi.string().max(50).required(),
  phoneNo: Joi.string()
    .regex(/03[0-9]{9}$/)
    .required(),
  age: Joi.number().min(0).max(110).required(),
  gender: Joi.string()
    .valid(...GENDERS)
    .required(),
});

const getPatient = Joi.object({
  pageLength: Joi.number().min(1).max(100),
  page: Joi.number().min(1),
});

module.exports = {
  addPatient,
  getPatient,
};
