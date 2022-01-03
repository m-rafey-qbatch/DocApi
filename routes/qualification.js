var express = require("express");
var router = express.Router();
const qualificationController = require("../controllers/qualification");
const { validateRequest } = require("../middleware/requestVlidations");
const { auth } = require("../middleware/authenticate");
const {
  getQualification,
  addQualification,
  updateQualification,
} = require("../JoiSchemas/Qualification");
router.get(
  "/",
  validateRequest(getQualification, "query"),
  auth,
  qualificationController.getQualifications
);
router.post(
  "/",
  validateRequest(addQualification),
  auth,
  qualificationController.addQualification
);
// router.put(
//   "/",
//   validateRequest(addQualification),
//   qualificationController.putQualifications
// );
router.put(
  "/",
  validateRequest(updateQualification),
  auth,
  qualificationController.updateQualification
);

router.delete(
  "/:id",
  validateRequest(getQualification),
  auth,
  qualificationController.deleteQualification
);

module.exports = router;
