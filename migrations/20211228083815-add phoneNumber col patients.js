'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  queryInterface.addColumn("patients","phoneNo",{
    type: Sequelize.STRING,
    unique: true,
   
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("patients","phoneNo")
  }
};
