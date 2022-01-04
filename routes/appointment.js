const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment");
const { validateRequest } = require("../middleware/requestVlidations");
const { auth } = require("../middleware/authenticate");
const {
  getAppointment,
  createAppointment,
  updateAppointment,
} = require("../JoiSchemas/Appointment");
router.use(auth);

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
  appointmentController.updateAppointment
);

router.delete(
  "/:id",
  validateRequest(getAppointment),
  appointmentController.deleteAppointment
);
module.exports = router;
