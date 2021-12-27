"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("appointments", {
      appointmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      doctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "doctors",
          key: "doctorId",
          allowNull: false,
        },
        onDelete: "CASCADE",
      },
      patientId: {
        type: Sequelize.INTEGER,
        references: {
          model: "patients",
          key: "patientId",
          allowNull: false,
        },
        onDelete: "CASCADE",
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull:false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("appointment");
  },
};
