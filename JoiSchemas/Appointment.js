const Joi = require("joi");
const {STATUS} = require('../utils/constants')

const createAppointment = Joi.object({
  patientId: Joi.number().integer().required(),
  doctorId: Joi.number().integer().required(),
  date: Joi.date().greater('now').required(),
  status: Joi.string().valid(...STATUS).optional(),
});

const getAppointment = Joi.object({
  patientId: Joi.number().integer().optional(),
  doctorId: Joi.number().integer().optional(),
  date: Joi.date().optional(),
  status: Joi.string().max(20).optional(),
  pageLength: Joi.number().optional(),
  page: Joi.number().optional(),

});

const updateAppointment = Joi.object({
  patientId: Joi.number().integer().required(),
  doctorId: Joi.number().integer().required(),
  date: Joi.date().greater('now').required(),
  status: Joi.string().max(20).required().optional(),
  appointmentId: Joi.number().integer().required(),
});
module.exports = {
  createAppointment,
  getAppointment,
  updateAppointment,
};
