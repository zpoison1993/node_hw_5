'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: Sequelize.STRING,
      image: Sequelize.STRING,
      middleName: Sequelize.STRING,
      permission: {
        chat: { C: Sequelize.BOOLEAN, R: Sequelize.BOOLEAN, U: Sequelize.BOOLEAN, D: Sequelize.BOOLEAN },
        news: { C: Sequelize.BOOLEAN, R: Sequelize.BOOLEAN, U: Sequelize.BOOLEAN, D: Sequelize.BOOLEAN },
        settings: { C: Sequelize.BOOLEAN, R: Sequelize.BOOLEAN, U: Sequelize.BOOLEAN, D: Sequelize.BOOLEAN }
      },
      surName: Sequelize.STRING,
      username: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
