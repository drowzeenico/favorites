const { Sequelize } = require('sequelize');

const Database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

module.exports.Sequelize = Sequelize;
module.exports.DB = Database;