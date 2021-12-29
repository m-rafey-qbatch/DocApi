var express = require("express");
var router = express.Router();
const doctorController = require("../controllers/doctor");

const { validateRequest } = require("../middleware/RequestVlidations");
const { getDoctor, addDoctor } = require("../JoiSchemas/Doctor");

router.get(
  "/",
  validateRequest(getDoctor, "query"),
  doctorController.getDoctors
);
router.post("/", validateRequest(addDoctor), doctorController.addDoctor);
router.put("/", validateRequest(addDoctor), doctorController.editDoctor);
// router.patch("/", validateRequest(addDoctor), doctorController.patchDoctors);
router.delete("/:docId", validateRequest(getDoctor), doctorController.deleteDoctor);


module.exports = router;
    