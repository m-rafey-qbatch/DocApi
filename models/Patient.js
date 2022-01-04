const { GENDERS } = require("../utils/constants");
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    "patients",
    {
      name: {
        type: DataTypes.STRING,
        required: true,
        validate: {
          len: {
            args: [1, 30],
            msg: "Name must be 30 characters max in length",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [GENDERS],
            msg: "Must be a valid type => " + GENDERS,
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          max: 110,
          min: 0,
        },
      },
      phoneNo: {
        type: DataTypes.STRING,
        required: true,
        validate: {
          is: {
            args: /03[0-9]{9}$/,
            msg: "must be a valid number in 03xxxxxxxxx formate",
          },
        },
      },
    },
    { timestamps: true }
  );

  Patient.associate = (models) => {
    Patient.hasMany(models.appointments, { foreignKey: "patient_id" });
  };

  Patient.addHook("beforeCreate", async (patient) => {
    let result = await Patient.findAndCountAll({
      where: {
        phoneNo: patient.phoneNo,
      },
    }).catch((err) => Promise.reject(err));
    if (result.count != 0)
      return Promise.reject(new Error("Patient Already Exists!"));
  });
  return Patient;
};
