const Joi = require("joi");

const createAppointment = Joi.object({
  patientId: Joi.number().integer().required(),
  doctorId: Joi.number().integer().required(),
  date: Joi.date().required(),
  status: Joi.string().required(),
});

const getAppointment = Joi.object({
  patientId: Joi.number().integer().optional(),
  doctorId: Joi.number().integer().optional(),
  date: Joi.date().optional(),
  status: Joi.string().optional(),
  perPage: Joi.number().optional(),
  page: Joi.number().optional(),

});

const updateAppointment = Joi.object({
  patientId: Joi.number().integer().required(),
  doctorId: Joi.number().integer().required(),
  date: Joi.string().required(),
  status: Joi.string().required().optional(),
  appointmentId: Joi.number().integer().required(),
});
module.exports = {
  createAppointment,
  getAppointment,
  updateAppointment,
};
