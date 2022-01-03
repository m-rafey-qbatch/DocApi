const Joi = require("joi");
const addQualification = Joi.object({
  doctorId: Joi.number().required(),
  qualification: Joi.string().max(30).required(),
});

const getQualification = Joi.object({
  pageLength: Joi.number().optional(),
  page: Joi.number().optional(),
});

const updateQualification = Joi.object({
  qualificationId: Joi.number().optional(),
  qualification: Joi.string().max(30).required(),
});

module.exports = {
  addQualification,
  getQualification,
  updateQualification
};
