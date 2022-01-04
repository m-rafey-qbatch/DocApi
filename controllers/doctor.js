const db = require("../models/index");

exports.getDoctors = async (req, res) => {
  const { pageLength, page } = req.query;
  const length = pageLength || 50;
  const pageNo = page || 0;

  db.doctors
    .findAndCountAll({
      limit: length,
      offset: length * pageNo,
      include: { model: db.qualifications },
    })
    .then((response) => {
      res.status(200).send({ success: true, doctors: response });
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
};

exports.updateDoctor = async (req, res) => {
  let result = await db.doctors.findOne({
    where: { email: req.body.email },
  });
  if (result) {
    await result.update(req.body);
    res.status(200).send({ success: true, message: "Doctor Updated!" });
  } else {
    db.doctors
      .create(req.body)
      .then((response) => {
        res.status(200).send({ success: true, message: "Doctor Added!" });
      })
      .catch((err) => {
        res.status(400).send({ success: false, message: err.message });
      });
  }
};

exports.addDoctor = async (req, res) => {
  db.doctors
    .create(req.body)
    .then(() => {
      res.status(200).send({ success: true, message: "Doctor Added!" });
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
};

exports.deleteDoctor = async (req, res) => {
  const { docId } = req.params;
  await db.doctors
    .destroy({
      where: { doctor_id: docId },
    })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
};
