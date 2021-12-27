var express = require("express");
var router = express.Router();
const appointmentController = require("../controllers/appointment");
const { validateRequest } = require("../middleware/RequestVlidations");
const {
  getAppointment,
  createAppointment,
} = require("../JoiSchemas/Appointment");

router.get(
  "/",
  validateRequest(getAppointment, "query"),
  appointmentController.getAppointments
);
router.post(
  "/",
  validateRequest(createAppointment),
  appointmentController.postAppointments
);
router.put(
  "/",
  validateRequest(createAppointment),
  appointmentController.putAppointments
);
router.patch(
  "/",
  validateRequest(createAppointment),
  appointmentController.patchAppointments
);
router.delete(
    "/:id",
    validateRequest(getAppointment),
    appointmentController.deleteAppointments
  );

module.exports = router;
