const express = require("express");
const router = express.Router();
const qualificationController = require("../controllers/qualification");
const { validateRequest } = require("../middleware/requestVlidations");
const { auth } = require("../middleware/authenticate");
const {
  getQualification,
  addQualification,
  updateQualification,
} = require("../JoiSchemas/Qualification");
router.use(auth);

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

router.put(
  "/",
  validateRequest(updateQualification),
  qualificationController.updateQualification
);

router.delete(
  "/:id",
  validateRequest(getQualification),
  qualificationController.deleteQualification
);

module.exports = router;
