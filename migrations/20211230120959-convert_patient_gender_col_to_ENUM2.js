"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("patients", "gender", {
      type: Sequelize.ENUM("male", "female", "other"),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("patients", "gender");
  },
};
