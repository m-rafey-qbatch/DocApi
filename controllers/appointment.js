const db = require("../models/index");
exports.getAppointments = async (req, res) => {
  try {
    let filters = [];
    const { page, pageLength, ...args } = req.query;
    const length = pageLength || 5;
    const pageNo = page || 1;

    for (const filter in args) {
      filters.push({ [filter]: args[filter] });
    }

    let result = await db.appointments.findAndCountAll({
      where: filters,
      limit: length,
      offset: length * (pageNo - 1),
    });
    await res.status(200).send({ success: true, appointments: result });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    await db.appointments.create(req.body);
    await res
      .status(200)
      .send({ success: true, message: "Appointment Added!" });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.appointments.findOne({
      where: { id: id },
    });
    if (result) {
      await result.update(req.body);
      await res
        .status(200)
        .send({ success: true, message: "Appointment Updated!" });
    } else {
      await db.appointments.create(req.body);
      await res
        .status(200)
        .send({ success: true, message: "Appointment Added!" });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await db.appointments.destroy({
      where: { id: id },
    });
    await res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};
