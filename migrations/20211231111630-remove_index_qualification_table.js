"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.removeIndex("qualifications", ["qualification", "doctor_id"]),

  down: async (queryInterface, Sequelize) =>
    queryInterface.addIndex("qualifications", ["qualification", "doctor_id"], {
      unique: true,
    }),
};
