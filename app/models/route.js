'use strict';
const RouteSchema = require('./schemas/route');

module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', RouteSchema(DataTypes), {});

  return Route;
};