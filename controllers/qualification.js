const db = require("../models/index");
const { Op } = db.Sequelize;

exports.getQualifications = async (req, res) => {
  db.qualifications
    .findAll()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

exports.postQualifications = (req, res) => {
  db.qualifications
    .create(req.body)
    .then((response) => {
      res.status(200).send("Qualification Added!!");
    })
    .catch((err) => res.status(400).send(err));
};

exports.putQualifications = async (req, res) => {
  let result = await db.qualifications
    .findAndCountAll({
      where: {
        [Op.and]: [
          { doctorId: { [Op.eq]: req.body.doctorId } },
          { qualification: { [Op.eq]: req.body.qualification } },
        ],
      },
    })
    .catch((err) => res.status(400).send(err));

  if (result.count == 0)
    db.qualifications
      .create(req.body)
      .then((response) => {
        res.status(200).send(" Qualification Added!!");
      })
      .catch((err) => res.status(400).send(err));
  else res.status(200).send("Data Already Added");
};

exports.patchQualifications = async (req, res) => {
  let result = await db.qualifications.findOne({
    where: { qualificationId: req.body.qualificationId },
  });
  if (result) {
    await result.update(req.body);
    await result.save();
    res.status(200).send("Qualification Updated!!");
  } else {
    db.qualifications
      .create(req.body)
      .then((response) => {
        res.status(200).send("Qualification Added!!");
      })
      .catch((err) => res.status(400).send(err));
  }
};

exports.deleteQualification = async (req, res) => {
  const { id } = req.params;

  await db.qualifications
    .destroy({
      where: { qualificationId: id },
    })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};
