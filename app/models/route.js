'use strict';
const RouteSchema = require('./schemas/route');
const RouteService = require('../services/route');

module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', RouteSchema(DataTypes), {
    tableName: 'routes'
  });

  Route.beforeCreate((route) => {
    const service = new RouteService(route);
    route.area = service.makeAreaGeoObject();
    route.original = service.makeOriginalGeoObject();
  })

  return Route;
};