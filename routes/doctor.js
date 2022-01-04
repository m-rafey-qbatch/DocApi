const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor");
const { validateRequest } = require("../middleware/requestVlidations");
const { auth } = require("../middleware/authenticate");
const { getDoctor, addDoctor } = require("../JoiSchemas/Doctor");
router.use(auth);

router.get(
  "/",
  validateRequest(getDoctor, "query"),
  doctorController.getDoctors
);
router.post("/", validateRequest(addDoctor), doctorController.addDoctor);
router.put("/", validateRequest(addDoctor), doctorController.updateDoctor);
router.delete(
  "/:docId",
  validateRequest(getDoctor),
  doctorController.deleteDoctor
);

module.exports = router;
