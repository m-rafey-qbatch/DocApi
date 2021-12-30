const db = require("../models/index");

exports.getQualifications = async (req, res) => {
  let pageNo = 0;
  let pageLength = 10;
  const { perPage, page } = req.query;

  if (perPage) pageLength = perPage;
  if (page) pageNo = page;

  db.qualifications
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

exports.postQualifications = (req, res) => {
  db.qualifications
    .create(req.body)
    .then(() => {
      res.status(200).send("Qualification Added!!");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ success: false, message: err.message });
    });
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
      .then(() => {
        res.status(200).send("Qualification Added!!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ success: false, message: err.message });
      });
  }
};

exports.deleteQualification = async (req, res) => {
  const { id } = req.params;
  await db.qualifications
    .destroy({
      where: { qualificationId: id },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ success: false, message: err.message })
    });
};
