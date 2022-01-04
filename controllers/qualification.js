const db = require("../models/index");

exports.getQualifications = async (req, res) => {
  const { pageLength, page } = req.query;
  const length = pageLength || 5;
  const pageNo = page || 0;
  db.qualifications
    .findAndCountAll({
      limit: length,
      offset: length * (pageNo - 1),
    })
    .then((response) => {
      res.status(200).send({ success: true, qualifications: response });
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
};

exports.addQualification = (req, res) => {
  db.qualifications
    .create(req.body)
    .then(() => {
      res
        .status(200)
        .send({ success: true, message: "Qualification Created!" });
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
};

exports.updateQualification = async (req, res) => {
  const { id } = req.params;
  let result = await db.qualifications.findOne({
    where: { id: id },
  });
  if (result) {
    await result.update(req.body);
    res.status(200).send({ success: true, message: "Qualification Updated!" });
  } else {
    db.qualifications
      .create(req.body)
      .then(() => {
        res
          .status(200)
          .send({ success: true, message: "Qualification Added!" });
      })
      .catch((err) => {
        res.status(400).send({ success: false, message: err.message });
      });
  }
};

exports.deleteQualification = async (req, res) => {
  const { id } = req.params;
  await db.qualifications
    .destroy({
      where: { id: id },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
};
