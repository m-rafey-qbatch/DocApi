const Joi = require("joi");
const addQualification = Joi.object({
  doctorId: Joi.number().required(),
  qualification: Joi.string().max(30).required(),
});

const getQualification = Joi.object({
  pageLength: Joi.number().min(1).max(100),
  page: Joi.number().min(1),
});

const updateQualification = Joi.object({
  qualificationId: Joi.number(),
  qualification: Joi.string().max(30).required(),
});

module.exports = {
  addQualification,
  getQualification,
  updateQualification
};
