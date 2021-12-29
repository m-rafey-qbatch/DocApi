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

exports.createAppointment = async (req, res) => {
  db.appointments
    .create(req.body)
    .then((response) => {
      res.status(200).send("Appointment Added!!");
    })
    .catch((err) => {
      res.status(205).send(err);
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
      .catch((err) => res.status(400).send(err));
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
      res.sendStatus(400);
    });
};
