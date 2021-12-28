module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("appointments", {
    appointmentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      required: true,
    },
    status: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      required: true,
      references: {
        model: "doctors",
        key: "doctorId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    },
    patientId: {
      type: DataTypes.INTEGER,
      required: true,
      references: {
        model: "patients",
        key: "patientId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.doctors, { foreignKey: "doctorId" });
    Appointment.belongsTo(models.patients, { foreignKey: "patientId" });
  };

  const Sequelize = require("sequelize");
  const { Op } = Sequelize;

  Appointment.addHook("beforeCreate", async (appoint, options) => {
    let result = await Appointment.findAndCountAll({
      where: {
        [Op.and]: [
          { doctorId: { [Op.eq]: appoint.doctorId } },
          { date: { [Op.eq]: appoint.date } },
        ],
      },
    }).catch((err) =>  Promise.reject(err));
    if (result.count >= 5)
      return Promise.reject("Slots Fulfilled!");
  });

  return Appointment;
};
