var express = require("express");
var router = express.Router();
const { validateRequest } = require("../middleware/RequestVlidations");
const { getPatient, addPatient } = require("../JoiSchemas/Patient");
const patientController = require('../controllers/patient')

router.get(
  "/",
  validateRequest(getPatient, "query"),
  patientController.getPatients
);
router.post("/", validateRequest(addPatient), patientController.postPatients);
router.put("/", validateRequest(addPatient), patientController.putPatients);
router.patch("/", validateRequest(addPatient), patientController.patchPatients);

module.exports = router;
