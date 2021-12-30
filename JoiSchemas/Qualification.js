const Joi = require("joi");

const addQualification = Joi.object({
  qualificationId: Joi.number().required(),
  qualification: Joi.string().max(30).required(),

});

const getQualification = Joi.object({
  pageLength: Joi.number().optional(),
  pageNumber: Joi.number().optional(),

});
module.exports = {
  addQualification,
  getQualification
};
