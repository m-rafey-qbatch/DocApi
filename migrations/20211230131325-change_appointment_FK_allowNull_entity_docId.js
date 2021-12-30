"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("appointments", "doctorId", {
      type: Sequelize.INTEGER,
      references: {
        model: "doctors",
        key: "doctorId",
      },
      onDelete: "CASCADE",
      allowNull:false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("appointments", "doctorId", {
      type: Sequelize.INTEGER,
      references: {
        model: "doctors",
        key: "doctorId",
      },
      onDelete: "CASCADE",
     
    });
  },
};


