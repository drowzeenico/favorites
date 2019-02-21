
const SHIFT = 0.005;
const KOEF = 0.005;

class RouteService {

  constructor(route = {}) {
    this.route = route;
  }

  set coords(coords = []) {
    this.route.coords = coords;
  }

  buildPolygonByLine() {
    let wrappedAreaCoords = [];
    this.route.coords.forEach(crd => {
      const x = parseFloat(crd[0]);
      const y = parseFloat(crd[1]);

      const pnt1 = [ x, y - SHIFT ];
      const pnt2 = [ x, y + SHIFT ];
      wrappedAreaCoords.push(pnt1, pnt2);
    });
    
    this.route.coords = wrappedAreaCoords;
  }

}

module.exports = RouteService;