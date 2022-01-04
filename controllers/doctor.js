const db = require("../models/index");

exports.getDoctors = async (req, res) => {
  try {
    const { pageLength, page } = req.query;
    const length = pageLength || 5;
    const pageNo = page || 1;

    const response = await db.doctors.findAndCountAll({
      limit: length,
      offset: length * (pageNo - 1),
      include: { model: db.qualifications },
    });

    await res.status(200).send({ success: true, doctors: response });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    let result = await db.doctors.findOne({
      where: { email: req.body.email },
    });
    if (result) {
      await result.update(req.body);
      await res.status(200).send({ success: true, message: "Doctor Updated!" });
    } else {
      await db.doctors.create(req.body);
      await res.status(200).send({ success: true, message: "Doctor Added!" });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.addDoctor = async (req, res) => {
  try {
    await db.doctors.create(req.body);
    await res.status(200).send({ success: true, message: "Doctor Added!" });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { docId } = req.params;
    await db.doctors.destroy({
      where: { id: docId },
    });
    await res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};
