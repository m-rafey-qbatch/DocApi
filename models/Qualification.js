module.exports = (sequelize, DataTypes) => {
  const Qualification = sequelize.define("qualifications", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "doctors",
        key: "id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    },
    qualification: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 50],
          msg: "Qualification must be 50 characters max in length",
        },
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
  });

  Qualification.associate = (models) => {
    Qualification.belongsTo(models.doctors, { foreignKey: "doctor_id" });
  };

  Qualification.addHook("beforeCreate", async (qua, options) => {
    let result = await Qualification.findAndCountAll({
      where: {
        qualification: qua.qualification,
        doctor_id: qua.doctor_id,
      },
    }).catch((err) => Promise.reject(err));
    if (result.count != 0)
      return Promise.reject(new Error("Qualification Already Exists!"));
  });
  return Qualification;
};
