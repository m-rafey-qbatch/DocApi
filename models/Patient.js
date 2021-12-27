module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define("patients", {
      patientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        required:true,
      },
      gender: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  
 
    Patient.associate = (models)=>{
        Patient.hasMany(models.appointments,{foreignKey:'patientId'})
      }
  
    return Patient;
  };
  