var express = require("express");
var router = express.Router();
const doctorController = require("../controllers/doctor");
const { validateRequest } = require("../middleware/requestVlidations");
const { auth } = require("../middleware/authenticate");
const { getDoctor, addDoctor } = require("../JoiSchemas/Doctor");

router.get(
  "/",
  validateRequest(getDoctor, "query"),
  auth,
  doctorController.getDoctors
);
router.post("/", validateRequest(addDoctor), auth, doctorController.addDoctor);
router.put(
  "/",
  validateRequest(addDoctor),
  auth,
  doctorController.updateDoctor
);
router.delete(
  "/:docId",
  auth,
  validateRequest(getDoctor),
  doctorController.deleteDoctor
);

module.exports = router;
