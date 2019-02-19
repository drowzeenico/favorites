'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      CREATE INDEX geometry_index ON routes USING GIST ( area )
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('routes', 'geometry_index')
  }
};
