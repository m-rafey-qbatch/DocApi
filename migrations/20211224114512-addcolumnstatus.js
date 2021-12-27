module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("appointments", "status", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("appointments", "status");
  },
};
