'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Users', {
      fields: ['email'],
      unique: true,
      name: 'users_emails_unique_index'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Users', 'users_emails_unique_index')
  }
};
