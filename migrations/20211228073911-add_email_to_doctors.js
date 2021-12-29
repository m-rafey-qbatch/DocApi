module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("doctors", "email", {
      type: Sequelize.STRING,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("doctors", "email");
  },
};
