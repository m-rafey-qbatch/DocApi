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
  qualificationController.addQualification
);
// router.put(
//   "/",
//   validateRequest(addQualification),
//   qualificationController.putQualifications
// );
router.put(
  "/",
  validateRequest(addQualification),
  qualificationController.editQualification
);

router.delete(
  "/:id",
  validateRequest(getQualification),
  qualificationController.deleteQualification
);

module.exports = router;
