module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("appointments", "status", {
      type: Sequelize.STRING(20),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("appointments", "status");
  },
};
