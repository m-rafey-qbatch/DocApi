"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("qualifications", "doctor_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "doctors",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull:false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("qualifications", "doctor_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "doctors",
        key: "id",
      },
      onDelete: "CASCADE",
     
    });
  },
};
