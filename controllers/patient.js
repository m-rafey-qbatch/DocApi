const db = require("../models/index");

exports.getPatients = async(req, res) => {
    db.patients
      .findAll() 
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  }

exports.postPatients = (req, res) => {
  db.patients
    .create(req.body)
    .then((response) => {
      res.status(200).send("Patient Added!!");
    })
    .catch((err) => res.status(400).send(err));
};

exports.putPatients = async (req, res) => {
    res.status(400).send("This service is not available");
};

exports.patchPatients= async (req, res) => {
  let result = await db.patients.findOne({
    where: { name: req.body.name },
  });
  if (result) {
    await result.update(req.body);
    await result.save();
    res.status(200).send("Patient Updated!!");
  } else {
    db.patients
      .create(req.body)
      .then((response) => {
        res.status(200).send("Patient Added!!");
      })
      .catch((err) => res.status(400).send(err));
  }
};
