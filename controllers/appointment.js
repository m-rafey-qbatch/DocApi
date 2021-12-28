const db = require("../models/index");
const { Op } = db.Sequelize;

exports.getAppointments = async (req, res) => {
  const { date, doctorId, patientId, status } = req.query;
  let filtersArray = [];
  let whereObj = { [Op.and]: [filtersArray] };

  if (date) filtersArray.push({ date: { [Op.eq]: date } });
  if (status) filtersArray.push({ status: { [Op.eq]: status } });

  if (doctorId) {
    db.doctors
      .findAll({
        include: [
          {
            model: db.appointments,
            where: whereObj,
          },
          { model: db.qualifications, attributes: ["qualification"] },
        ],
        where: { doctorId: { [Op.eq]: doctorId } },
      })
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  } else if (patientId) {
    db.patients
      .findAll({
        include: { model: db.appointments, where: whereObj },
        where: { patientId: { [Op.eq]: patientId } },
      })
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  } else {
    db.appointments
      .findAll({ where: whereObj })
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  }
};

exports.postAppointments = async (req, res) => {
  db.appointments
    .create(req.body)
    .then((response) => {
      res.status(200).send("Appointment Added!!");
    })
    .catch((err) => {
      res.status(205).send(err);
    });
};
exports.putAppointments = async (req, res) => {
  let result = await db.appointments
    .findAndCountAll({
      where: {
        [Op.and]: [
          { doctorId: { [Op.eq]: req.body.doctorId } },
          { patientId: { [Op.eq]: req.body.patientId } },
          { status: { [Op.eq]: req.body.status } },
          { date: { [Op.eq]: req.body.date } },
        ],
      },
    })
    .catch((err) => res.status(400).send(err));

  if (result.count == 0)
    db.appointments
      .create(req.body)
      .then((response) => {
        res.status(200).send("Appointment Added!!");
      })
      .catch((err) => res.status(205).send(err));
  else res.status(400).send("Appointment Already added");
};

exports.patchAppointments = async (req, res) => {
  let result = await db.appointments.findOne({
    where: { appointmentId: req.body.appointmentId },
  });
  if (result) {
    await result.update(req.body);
    await result.save();
    res.status(200).send("Appointment Updated!!");
  } else {
    db.appointments
      .create(req.body)
      .then((response) => {
        res.status(200).send("Appointment Added!!");
      })
      .catch((err) => res.status(400).send(err));
  }
};

exports.deleteAppointments = async (req, res) => {
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
      res.sendStatus(400);
    });
};
