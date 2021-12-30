const db = require("../models/index");

exports.getPatients = async (req, res) => {
  let pageNo = 0;
  let pageLength = 5;
  const { perPage, page } = req.query;

  if (perPage) pageLength = perPage;
  if (page) pageNo = page;

  db.patients
    .findAndCountAll({
      limit: pageLength,
      offset: pageLength * pageNo,
    })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ success: false, message: err.message });
    });
};

exports.addPatient = (req, res) => {
  db.patients
    .create(req.body)
    .then(() => {
      res.status(200).send("Patient Added!!");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ success: false, message: err.message });
    });
};

exports.updatePatient = async (req, res) => {
  let result = await db.patients.findOne({
    where: { phoneNo: req.body.phoneNo },
  });
  if (result) {
    await result.update(req.body);
    await result.save();
    res.status(200).send("Patient Updated!!");
  } else {
    db.patients
      .create(req.body)
      .then(() => {
        res.status(200).send("Patient Added!!");
      })
      .catch((err) =>{console.log(err)
      res.status(400).send({ success: false, message: err.message })});
  }
};

exports.deletePatient = async (req, res) => {
  const { patId } = req.params;

  await db.patients
    .destroy({
      where: { patientId: patId },
    })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ success: false, message: err.message })
    });
};
