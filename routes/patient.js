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
router.post("/", validateRequest(addPatient), patientController.addPatient);
router.put("/", validateRequest(addPatient), patientController.updatePatient);
router.delete("/:patId", validateRequest(getPatient), patientController.deletePatient);

module.exports = router;
