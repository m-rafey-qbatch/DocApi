const db = require("../models/index");
exports.getAppointments = async (req, res) => {
  let whereObj = [];
  let pageNo = 0;
  let pageLength = 5;

  const { date, doctorId, patientId, status, perPage, page } = req.query;

  if (perPage) pageLength = perPage;
  if (page) pageNo = page;
  if (date) whereObj.push({ date: date });
  if (status) whereObj.push({ status: status });
  if (doctorId) whereObj.push({ doctorId: doctorId });
  if (patientId) whereObj.push({ patientId: patientId });

  db.appointments
    .findAndCountAll({
      where: whereObj,
      limit: pageLength,
      offset: pageLength * pageNo,
    })
    .then((response) => {
      res.status(200).send({ success: true, appointments: response });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ success: false, message: err.message });
    });
};

exports.createAppointment = async (req, res) => {
  db.appointments
    .create(req.body)
    .then((response) => {
      res.status(200).send("Appointment Added!!");
    })
    .catch((err) => {
      console.log(err)
      res.status(205).send(err.message);
    });
};

exports.editAppointment = async (req, res) => {
  let result = await db.appointments.findOne({
    where: { appointmentId: req.body.appointmentId },
  });
  if (result) {
    result.update(req.body);
    result.save();
    res.status(200).send("Appointment Updated!!");
  } else {
    db.appointments
      .create(req.body)
      .then((response) => {
        res.status(200).send("Appointment Added!!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ success: false, message: err.message });
      });
  }
};

exports.deleteAppointment = async (req, res) => {
  let { id } = req.params;

  await db.appointments
    .destroy({
      where: { appointmentId: id },
    })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ success: false, message: err.message });
    });
};
