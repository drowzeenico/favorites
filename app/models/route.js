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

  Route.findNearbyRoutes = (id, user_id) => {
    const plainSQL = `
      with selected as (
        select area from routes where id = :id
      )
      select *, st_area(st_intersection((select * from selected), area)) as square
      from (
          select *, st_intersects((select * from selected), area) as common
          from routes
          where id != :id 
        ) as Intersects
      where common = true
      order by square DESC`;

      // and user_id != :user_id
    
      return sequelize.query(plainSQL, {
      replacements: {
        id: id,
        user_id: user_id
      },
      type: sequelize.QueryTypes.SELECT
    })
  }

  return Route;
};