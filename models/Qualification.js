module.exports = (sequelize, DataTypes) => {
  const Qualification = sequelize.define("qualifications", {
    qualificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      references: {
        model: "doctors",
        key: "doctorId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    },
    qualification: {
      type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  Qualification.associate = (models) => {
    Qualification.belongsTo(models.doctors, { foreignKey: "doctorId" });
  };

  return Qualification;
};
