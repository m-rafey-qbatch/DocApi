"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("appointments", "status", {
      type: Sequelize.ENUM("pending", "canceled", "completed"),
      allowNull: false,
      defaultValue: "pending",
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("appointments", "status");
  },
};
