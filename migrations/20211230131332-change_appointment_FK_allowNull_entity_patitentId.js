"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("appointments", "patient_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("appointments", "patient_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },
};
