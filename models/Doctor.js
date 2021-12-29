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

  Doctor.addHook("beforeCreate", async (doc) => {
    let result = await Doctor.findAndCountAll({
      where: {
        email: doc.email,
      },
    }).catch((err) => Promise.reject(err));
    if (result.count != 0) return Promise.reject("Doctor Already Exists!");
  });

  return Doctor;
};
