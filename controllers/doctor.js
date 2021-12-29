const db = require("../models/index");
const { Op } = db.Sequelize;

exports.getDoctors = async (req, res) => {
  db.doctors
    .findAll({ include: { model: db.qualifications } })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

exports.editDoctor = async (req, res) => {
  let result = await db.doctors.findOne({
    where: { email: req.body.email },
  });
  if (result) {
    result.update(req.body);
    result.save();
    res.status(200).send("Doctor Updated!!");
  } else {
    db.doctors
      .create(req.body)
      .then((response) => {
        res.status(200).send("Doctor Added!!");
      })
      .catch((err) => res.status(400).send(err));
  }

};

exports.addDoctor = async (req, res) => {
  db.doctors
    .create(req.body)
    .then((response) => {
      res.status(200).send("Doctor Added!!");
    })
    .catch((err) => res.status(400).send(err));
};



exports.deleteDoctor = async (req, res) => {
  const { docId } = req.params;
  console.log(docId);

  await db.doctors
    .destroy({
      where: { doctorId: docId },
    })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};
