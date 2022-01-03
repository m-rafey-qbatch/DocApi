var express = require("express");
var router = express.Router();
const { validateRequest } = require("../middleware/requestVlidations");
const { auth } = require("../middleware/authenticate");
const { getPatient, addPatient } = require("../JoiSchemas/Patient");
const patientController = require("../controllers/patient");

router.get(
  "/",
  validateRequest(getPatient, "query"),
  auth,
  patientController.getPatients
);
router.post(
  "/",
  validateRequest(addPatient),
  auth,
  patientController.addPatient
);
router.put(
  "/",
  validateRequest(addPatient),
  auth,
  patientController.updatePatient
);
router.delete(
  "/:patId",
  validateRequest(getPatient),
  auth,
  patientController.deletePatient
);

module.exports = router;
