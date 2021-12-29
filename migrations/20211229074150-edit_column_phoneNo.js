"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("patients", "phoneNo", {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("patients", "phoneNo", {
      type: Sequelize.STRING(20),
      unique: true,
    });
  },
};
