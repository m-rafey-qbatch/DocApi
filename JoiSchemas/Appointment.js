const Joi = require("joi");
const { STATUSES } = require("../utils/constants");

const createAppointment = Joi.object({
  patient_id: Joi.number().integer().required(),
  doctor_id: Joi.number().integer().required(),
  date: Joi.date().greater("now").required(),
  status: Joi.string().valid(...STATUSES),
});

const getAppointment = Joi.object({
  patient_id: Joi.number().integer(),
  doctor_id: Joi.number().integer(),
  date: Joi.date(),
  status: Joi.string().max(20),
  pageLength: Joi.number().min(1).max(100),
  page: Joi.number().min(1),
});

const updateAppointment = Joi.object({
  patient_id: Joi.number().integer().required(),
  doctor_id: Joi.number().integer().required(),
  date: Joi.date().greater("now").required(),
  status: Joi.string().max(20).required(),
  id: Joi.number().integer().required(),
});
module.exports = {
  createAppointment,
  getAppointment,
  updateAppointment,
};
