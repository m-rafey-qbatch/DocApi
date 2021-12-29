const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define(
    "doctors",
    {
      doctorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        required: true,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["email"],
        },
      ],
    }
  );

  Doctor.associate = (models) => {
    Doctor.hasMany(models.appointments, { foreignKey: "doctorId" });
    Doctor.hasMany(models.qualifications, { foreignKey: "doctorId" });
  };

  const { Op } = Sequelize;
  Doctor.addHook("beforeCreate", async (doc, options) => {
    let result = await Doctor.findAndCountAll({
      where: {
        email: { [Op.eq]: doc.email },
      },
    }).catch((err) => Promise.reject(err));
    if (result.count != 0) return Promise.reject("Doctor Already Exists!");
  });

  return Doctor;
};
