var express = require("express");
var router = express.Router();
const appointmentController = require("../controllers/appointment");
const { validateRequest } = require("../middleware/requestVlidations");
const { auth } = require("../middleware/authenticate");
const {
  getAppointment,
  createAppointment,
  updateAppointment,
} = require("../JoiSchemas/Appointment");

router.get(
  "/",
  validateRequest(getAppointment, "query"),auth,
  appointmentController.getAppointments
);
router.post(
  "/",
  validateRequest(createAppointment),auth,
  appointmentController.createAppointment
);
router.put(
  "/",
  validateRequest(updateAppointment),auth,
  appointmentController.updateAppointment
);

router.delete(
  "/:id",
  validateRequest(getAppointment),auth,
  appointmentController.deleteAppointment
);

module.exports = router;
