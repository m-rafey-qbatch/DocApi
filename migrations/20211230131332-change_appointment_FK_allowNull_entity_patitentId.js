"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("appointments", "patientId", {
      type: Sequelize.INTEGER,
      references: {
        model: "patients",
        key: "patientId",
      },
      onDelete: "CASCADE",
      allowNull:false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("appointments", "patientId", {
      type: Sequelize.INTEGER,
      references: {
        model: "patients",
        key: "patientId",
      },
      onDelete: "CASCADE",
     
    });
  },
};


