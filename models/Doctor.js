module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define(
    "doctors",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        required: true,
        validate: {
          len: {
            args: [1, 50],
            msg: "Name must be 50 characters max in length",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        validate: {
          isEmail: true,
          len: {
            args: [1, 40],
            msg: "Email must be 40 characters max in length",
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          max: 110,
          min: 18,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
    }
  );

  Doctor.associate = (models) => {
    Doctor.hasMany(models.appointments, { foreignKey: "doctor_id" });
    Doctor.hasMany(models.qualifications, { foreignKey: "doctor_id" });
  };

  Doctor.addHook("beforeCreate", async (doc) => {
    let result = await Doctor.findAndCountAll({
      where: {
        email: doc.email,
      },
    }).catch((err) => Promise.reject(err));
    if (result.count != 0)
      return Promise.reject(new Error("Doctor Already Exists!"));
  });

  return Doctor;
};
