const Joi = require("joi");

const createAppointment = Joi.object({
  patientId: Joi.number().integer(),
  doctorId: Joi.number().integer(),
  date: Joi.string().required(),
  status: Joi.string().required(),

});

const getAppointment = Joi.object({
  patientId: Joi.number().integer().optional(),
  doctorId: Joi.number().integer().optional(),
  date: Joi.string().required().optional(),
  status: Joi.string().required().optional(),

});
module.exports = {
  createAppointment,
  getAppointment
};
