
const SHIFT = 0.0055;
const SRIDFIELD = {
  type: 'name', 
  properties: { name: 'EPSG:4326' }
};

const GrahamScan = require('./graham');

class RouteService {

  constructor(route = {}) {
    this.route = route;
  }

  calculateMinimumConvexHull() {
    let wrappedAreaCoords = [];
    this.route.coords.forEach(crd => {
      const x = parseFloat(crd[0]);
      const y = parseFloat(crd[1]);

      const pnt1 = [ x, y - SHIFT ];
      const pnt2 = [ x, y + SHIFT ];
      wrappedAreaCoords.push(pnt1, pnt2);
    });

    let boundryPoints = GrahamScan(wrappedAreaCoords).map( crd => {
      delete crd.polar;
      return crd;
    });
    boundryPoints.push(boundryPoints[0]);
    this.route.minimumConvexHull = boundryPoints;
  }

  makeAreaGeoObject() {
    return {
      type: 'Polygon',
      coordinates: [
        this.route.area
      ],
      crs: SRIDFIELD
    };
  }

  makeOriginalGeoObject() {
    return {
      type: 'LineString',
      coordinates: this.route.original,
      crs: SRIDFIELD
    };
  }

}

module.exports = RouteService;