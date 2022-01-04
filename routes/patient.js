const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/requestVlidations");
const { auth } = require("../middleware/authenticate");
const { getPatient, addPatient } = require("../JoiSchemas/Patient");
const patientController = require("../controllers/patient");
router.use(auth);

router.get(
  "/",
  validateRequest(getPatient, "query"),
  patientController.getPatients
);
router.post("/", validateRequest(addPatient), patientController.addPatient);
router.put("/", validateRequest(addPatient), patientController.updatePatient);
router.delete(
  "/:patId",
  validateRequest(getPatient),
  patientController.deletePatient
);

module.exports = router;
