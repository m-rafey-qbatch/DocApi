"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.removeIndex("qualifications", ["qualification", "doctorId"]),

  down: async (queryInterface, Sequelize) =>
    queryInterface.addIndex("qualifications", ["qualification", "doctorId"], {
      unique: true,
    }),
};
