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

  Route.findNearbyRoutes = (id, area) => {
    const service = new RouteService({area: area.coordinates});
    area = service.makeAreaGeoObject();
    
    const plainSQL = `
      with geometry as (
        select ST_GeomFromGeoJSON(:area)
      )
      select *, st_area(st_intersection( (select * from geometry), area )) as square
      from (
          select *, st_intersects( (select * from geometry), area ) as common
          from routes
          where id != :id
        ) as Intersects
      where common = true
      order by square DESC`;
    sequelize.query(plainSQL, {
      replacements: {
        id: id,
        area: JSON.stringify(area)
      },
      type: sequelize.QueryTypes.SELECT
    })
  }

  return Route;
};