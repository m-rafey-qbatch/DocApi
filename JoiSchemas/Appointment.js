const Joi = require("joi");

const createAppointment = Joi.object({
  patientId: Joi.number().integer().required(),
  doctorId: Joi.number().integer().required(),
  date: Joi.date().less('now').required(),
  status: Joi.string().length(20).required(),
});

const getAppointment = Joi.object({
  patientId: Joi.number().integer().optional(),
  doctorId: Joi.number().integer().optional(),
  date: Joi.date().optional(),
  status: Joi.string().length(20).optional(),
  perPage: Joi.number().optional(),
  page: Joi.number().optional(),

});

const updateAppointment = Joi.object({
  patientId: Joi.number().integer().required(),
  doctorId: Joi.number().integer().required(),
  date: Joi.date().less('now').required(),
  status: Joi.string().length(20).required().optional(),
  appointmentId: Joi.number().integer().required(),
});
module.exports = {
  createAppointment,
  getAppointment,
  updateAppointment,
};
