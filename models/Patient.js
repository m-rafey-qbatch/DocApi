
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define("patients", {
    patientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    gender: {
      type: DataTypes.ENUM,
        values:['other','male','female']
    },
    age: {
      type: DataTypes.INTEGER,
    },
    phoneNo: {
      type: DataTypes.STRING,
      required: true, 
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull:false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull:false,
    },
  });

  Patient.associate = (models) => {
    Patient.hasMany(models.appointments, { foreignKey: "patientId" });
  };

  Patient.addHook("beforeCreate", async (patient) => {
    let result = await Patient.findAndCountAll({
      where: {
        phoneNo: patient.phoneNo,
      },
    }).catch((err) => Promise.reject(err));
    if (result.count != 0) return Promise.reject(new Error("Patient Already Exists!"));
  });

  return Patient;
};
