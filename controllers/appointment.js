const db = require("../models/index");
exports.getAppointments = async (req, res) => {
  let filters = [];
  const { page, pageLength, ...args } = req.query;
  const length = pageLength || 5;
  const pageNo = page || 1;

  for (const filter in args) {
    filters.push({ [filter]: args[filter] });
  }
  console.log(filters);

  db.appointments
    .findAndCountAll({
      where: filters,
      limit: length,
      offset: length * (pageNo - 1),
    })
    .then((response) => {
      res.status(200).send({ success: true, appointments: response });
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
};

exports.createAppointment = async (req, res) => {
  db.appointments
    .create(req.body)
    .then((response) => {
      res.status(200).send({ success: true, message: "Appointment Added!" });
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};

exports.updateAppointment = async (req, res) => {
  let result = await db.appointments.findOne({
    where: { appointmentId: req.body.appointmentId },
  });
  if (result) {
    result.update(req.body);
    res.status(200).send({ success: true, message: "Appointment Updated!" });
  } else {
    db.appointments
      .create(req.body)
      .then((response) => {
        res.status(200).send({ success: true, message: "Appointment Added!" });
      })
      .catch((err) => {
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
      res.status(400).send({ success: false, message: err.message });
    });
};
