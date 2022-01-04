function validateRequest(schema, key = "body") {
  return async (req, res, next) => {
    let { error } = await schema.validate(req[key]);
    if (error) res.status(400).send({ success: false, message: error });
    else next();
  };
}
module.exports = { validateRequest };
