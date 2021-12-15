'use strict';

import {BOOLEAN, INTEGER, STRING} from "sequelize";

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('users', {
       id: {
         type: INTEGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
       },
       firstName: STRING,
       image: STRING,
       middleName: STRING,
       permission: {
         chat: { C: BOOLEAN, R: BOOLEAN, U: BOOLEAN, D: BOOLEAN },
         news: { C: BOOLEAN, R: BOOLEAN, U: BOOLEAN, D: BOOLEAN },
         settings: { C: BOOLEAN, R: BOOLEAN, U: BOOLEAN, D: BOOLEAN }
       },
       surName: STRING,
       username: STRING
     });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
