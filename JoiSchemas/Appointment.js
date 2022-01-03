const Joi = require("joi");
const { STATUSES } = require("../utils/constants");

const createAppointment = Joi.object({
  patientId: Joi.number().integer().required(),
  doctorId: Joi.number().integer().required(),
  date: Joi.date().greater("now").required(),
  status: Joi.string().valid(...STATUSES),
});

const getAppointment = Joi.object({
  patientId: Joi.number().integer(),
  doctorId: Joi.number().integer(),
  date: Joi.date(),
  status: Joi.string().max(20),
  pageLength: Joi.number().min(1).max(100),
  page: Joi.number().min(1),
});

const updateAppointment = Joi.object({
  patientId: Joi.number().integer().required(),
  doctorId: Joi.number().integer().required(),
  date: Joi.date().greater("now").required(),
  status: Joi.string().max(20).required(),
  appointmentId: Joi.number().integer().required(),
});
module.exports = {
  createAppointment,
  getAppointment,
  updateAppointment,
};
