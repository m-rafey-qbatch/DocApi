const db = require("../models/index");

exports.getPatients = async (req, res) => {
  const { pageLength, page } = req.query;
  const length = pageLength || 5;
  const pageNo = page || 0;
  db.patients
    .findAndCountAll({
      limit: length,
      offset: length * pageNo,
    })
    .then((response) => {
      res.status(200).send({ success: true, patients: response });
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
};

exports.addPatient = (req, res) => {
  db.patients
    .create(req.body)
    .then(() => {
      res.status(200).send({ success: true, message: "Patient Added!" });
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
};

exports.updatePatient = async (req, res) => {
  let result = await db.patients.findOne({
    where: { phoneNo: req.body.phoneNo },
  });
  if (result) {
    await result.update(req.body);
    res.status(200).send({ success: true, message: "Patient Updated!" });
  } else {
    db.patients
      .create(req.body)
      .then(() => {
        res.status(200).send({ success: true, message: "Patient Added!" });
      })
      .catch((err) => {
        res.status(400).send({ success: false, message: err.message });
      });
  }
};

exports.deletePatient = async (req, res) => {
  const { patId } = req.params;
  await db.patients
    .destroy({
      where: { id: patId },
    })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
};
