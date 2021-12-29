const Joi = require("joi");

const addQualification = Joi.object({
  doctorId: Joi.number().required(),
  qualification: Joi.string().length(20).required(),

});

const getQualification = Joi.object({
  pageLength: Joi.number().optional(),
  pageNumber: Joi.number().optional(),

});
module.exports = {
  addQualification,
  getQualification
};
