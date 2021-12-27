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
  let appointmentsPerDay = await db.appointments
    .findAndCountAll({
      where: {
        [Op.and]: [
          { doctorId: { [Op.eq]: req.body.doctorId } },
          { date: { [Op.eq]: req.body.date } },
        ],
      },
    })
    .catch((err) => res.status(400).send(err));

  if (appointmentsPerDay.count < 5)
    db.appointments
      .create(req.body)
      .then((response) => {
        res.status(200).send("Appointment Added!!");
      })
      .catch((err) => res.status(400).send(err));
  else res.status(400).send("Slots filled");
};
exports.putAppointments = async (req, res) => {
  res.status(400).send("This service is not available");
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
