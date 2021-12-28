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

exports.postDoctors = async (req, res) => {
  let result = await db.doctors
    .findAndCountAll({
      where: {
        email: { [Op.eq]: req.body.email },
      },
    })
    .catch((err) => res.status(400).send(err));
console.log(result)
  if (result.count == 0)
    db.doctors
      .create(req.body)
      .then((response) => {
        res.status(200).send(" Doctor Added!!");
      })
      .catch((err) => res.status(400).send(err));
  else res.status(200).send("Doctor Already Exists!!");
};

exports.putDoctors = async (req, res) => {
  db.doctors
    .create(req.body)
    .then((response) => {
      res.status(200).send("Doctors Added!!");
    })
    .catch((err) => res.status(400).send(err));
};

exports.patchDoctors = async (req, res) => {
  let result = await db.doctors.findOne({
    where: { name: req.body.name },
  });
  if (result) {
    await result.update(req.body);
    await result.save();
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

exports.deleteDoctors = async (req, res) => {
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
