const db = require("../models/index");

exports.getQualifications = async (req, res) => {
  try {
    const { pageLength, page } = req.query;
    const length = pageLength || 5;
    const pageNo = page || 1;
    const response = await db.qualifications.findAndCountAll({
      limit: length,
      offset: length * (pageNo - 1),
    });
    await res.status(200).send({ success: true, qualifications: response });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.addQualification = async (req, res) => {
  try {
    await db.qualifications.create(req.body);
    await res
      .status(200)
      .send({ success: true, message: "Qualification Created!" });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.updateQualification = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.qualifications.findOne({
      where: { id: id },
    });
    if (result) {
      await result.update(req.body);
      await res
        .status(200)
        .send({ success: true, message: "Qualification Updated!" });
    } else {
      await db.qualifications.create(req.body);
      await res
        .status(200)
        .send({ success: true, message: "Qualification Added!" });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.deleteQualification = async (req, res) => {
  try {
    const { id } = req.params;
    await db.qualifications.destroy({
      where: { id: id },
    });
    await res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};
