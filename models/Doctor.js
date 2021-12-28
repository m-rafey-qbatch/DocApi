module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define("doctors", {
      doctorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        required:true,
      },
      email: {
        type: DataTypes.STRING,
        required:true,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  

    Doctor.associate = (models)=>{
        Doctor.hasMany(models.appointments,{foreignKey:'doctorId'})
        Doctor.hasMany(models.qualifications,{foreignKey:'doctorId'})
      }
   
      
    return Doctor;
  };
  