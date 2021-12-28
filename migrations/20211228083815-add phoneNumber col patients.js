'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  queryInterface.addColumn("patients","phoneNo",{
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:"03001123456"
  })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("patients","phoneNo")
  }
};
