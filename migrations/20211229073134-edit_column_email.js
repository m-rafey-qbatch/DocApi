"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("doctors", "email", {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("doctors", "email", {
      type: Sequelize.STRING(40),
      unique: true,
    });
  },
};
