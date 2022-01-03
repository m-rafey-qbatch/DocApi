"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("appointments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "doctors",
          key: "id",
          allowNull: false,
        },
        onDelete: "CASCADE",
      },
      patient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "patients",
          key: "id",
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
    queryInterface.dropTable("appointments");
  },
};
