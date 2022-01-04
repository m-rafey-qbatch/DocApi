const db = require("../models/index");

exports.getPatients = async (req, res) => {
  try {
    const { pageLength, page } = req.query;
    const length = pageLength || 5;
    const pageNo = page || 1;
    const response = await db.patients.findAndCountAll({
      limit: length,
      offset: length * (pageNo - 1),
    });
    await res.status(200).send({ success: true, patients: response });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.addPatient = async(req, res) => {
  try {
    await db.patients.create(req.body);
    await res.status(200).send({ success: true, message: "Patient Added!" });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const result = await db.patients.findOne({
      where: { phoneNo: req.body.phoneNo },
    });
    if (result) {
      await result.update(req.body);
      res.status(200).send({ success: true, message: "Patient Updated!" });
    } else {
      await db.patients.create(req.body);
      await res.status(200).send({ success: true, message: "Patient Added!" });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { patId } = req.params;
    await db.patients.destroy({
      where: { id: patId },
    });
    await res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};
