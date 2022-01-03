const { STATUSES } = require("../utils/constants");

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("appointments", {
    id: {
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
      validate: {
        isIn: {
          args: [STATUSES],
          msg: "Must be a valid type => " + STATUSES,
        },
      },
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      required: true,
      references: {
        model: "doctors",
        key: "id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    },
    patient_id: {
      type: DataTypes.INTEGER,
      required: true,
      references: {
        model: "patients",
        key: "id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.doctors, { foreignKey: "doctor_id" });
    Appointment.belongsTo(models.patients, { foreignKey: "patient_id" });
  };

  Appointment.addHook("beforeCreate", async (appoint) => {
    let result = await Appointment.findAndCountAll({
      where: {
        doctor_id: appoint.doctor_id,
        date: appoint.date,
      },
    }).catch((err) => Promise.reject(err));
    if (result.count >= 5) return Promise.reject(new Error("Slots Fulfilled!"));
  });
  return Appointment;
};
