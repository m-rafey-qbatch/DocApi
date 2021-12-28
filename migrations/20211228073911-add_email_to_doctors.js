module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("doctors", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue:"doc@email.com"
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("doctors", "email");
  },
};
