"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("qualifications", "doctorId", {
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
    queryInterface.changeColumn("qualifications", "doctorId", {
      type: Sequelize.INTEGER,
      references: {
        model: "doctors",
        key: "doctorId",
      },
      onDelete: "CASCADE",
     
    });
  },
};


