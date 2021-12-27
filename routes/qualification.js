var express = require("express");
var router = express.Router();
const qualificationController = require("../controllers/qualification");
const { validateRequest } = require("../middleware/RequestVlidations");
const {
  getQualification,
  addQualification,
} = require("../JoiSchemas/Qualification");
router.get(
  "/",
  validateRequest(getQualification, "query"),
  qualificationController.getQualifications
);
router.post(
  "/",
  validateRequest(addQualification),
  qualificationController.postQualifications
);
router.put(
  "/",
  validateRequest(addQualification),
  qualificationController.putQualifications
);
router.patch(
  "/",
  validateRequest(addQualification),
  qualificationController.patchQualifications
);

module.exports = router;
