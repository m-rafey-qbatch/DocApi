var express = require("express");
var router = express.Router();
const appointmentController = require("../controllers/appointment");
const { validateRequest } = require("../middleware/RequestVlidations");
const {
  getAppointment,
  createAppointment,
  updateAppointment
} = require("../JoiSchemas/Appointment");

router.get(
  "/",
  validateRequest(getAppointment, "query"),
  appointmentController.getAppointments
);
router.post(
  "/",
  validateRequest(createAppointment),
  appointmentController.createAppointment
);
router.put(
  "/",
  validateRequest(updateAppointment),
  appointmentController.editAppointment
);

router.delete(
    "/:id",
    validateRequest(getAppointment),
    appointmentController.deleteAppointment
  );

module.exports = router;
