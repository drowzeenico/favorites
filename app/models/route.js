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
      WITH selected AS (
        SELECT area FROM routes WHERE id = :id
      )
      SELECT 
        Intersects.*, 
	      "Users"."firstName", 
	      "Users"."lastName",
        st_area(st_intersection((SELECT * FROM selected), area)) AS square
      FROM (
          SELECT *, st_intersects((SELECT * FROM selected), area) AS common
          FROM routes
          WHERE id != :id AND user_id != :user_id
        ) AS Intersects 
        INNER JOIN "Users" ON intersects.user_id = "Users".id
      WHERE common = true
      ORDER BY square DESC`;

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