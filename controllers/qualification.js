const db = require("../models/index");

exports.getQualifications = async(req, res) => {
    db.qualifications
      .findAll() 
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  }

exports.postQualifications = (req, res) => {
  db.qualifications
    .create(req.body)
    .then((response) => {
      res.status(200).send("Qualification Added!!");
    })
    .catch((err) => res.status(400).send(err));
};

exports.putQualifications = async (req, res) => {
    res.status(400).send("This service is not available");
};

exports.patchQualifications= async (req, res) => {
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
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};
