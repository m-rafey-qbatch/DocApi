"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("patients", "gender");
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("patients", "gender", {
      type: Sequelize.STRING(20),
    });
  },
};
