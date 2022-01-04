"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("qualifications", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      qualification: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "doctors",
          key: "id",
          allowNull: false,
        },
        onDelete: "CASCADE",
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("qualifications");
  },
};
