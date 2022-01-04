"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addIndex("qualifications", ["qualification", "doctor_id"], {
      unique: true,
    }),
  down: async (queryInterface, Sequelize) =>
    queryInterface.removeIndex("qualifications", ["qualification", "doctor_id"]),
};
