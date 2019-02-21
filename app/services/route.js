const GrahamScan = require('./graham');

const SHIFT = 0.005;

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

    // this.route.minimumConvexHull = this._graham(wrappedAreaCoords);
    this.route.minimumConvexHull = GrahamScan(wrappedAreaCoords);
  }

  /**
   * Returns vector product
   */
  _classify(vector, x1, y1) {
    return (vector.x2 - vector.x1) * (y1 - vector.y1) - (vector.y2 - vector.y1) * (x1 - vector.x1);
  }

  /**
  * Graham's algorithm
  */
  _graham(points) {
    let ch = points.map((v, i) => i);
    let h = [];

    let minIdx = 0;
    let min = points[0][1];

    // ищем нижнюю левую точку
    for (let i = 1; i < points.length; i++) {
      if (points[i][1] < min) {
        min = points[i][1];
        minIdx = i;
      }
    }

    // делаем нижнюю левую точку активной
    ch[0] = minIdx;
    ch[minIdx] = 0;

    // сортируем вершины в порядке "левизны"
    for (let i = 1; i < ch.length - 1; i++) {
      for (let j = i + 1; j < ch.length; j++) {
        let vector = {
          'x1': points[ ch[0] ][1],
          'y1': points[ ch[0] ][0],
          'x2': points[ ch[i] ][1],
          'y2': points[ ch[i] ][0]
        };

        let cl = this._classify(vector, points[ ch[j] ][1], points[ ch[j] ][0]);

        // если векторное произведение меньше 0, следовательно вершина j левее вершины i: меняем их местами
        if (cl < 0) {
          let temp = ch[i];
          ch[i] = ch[j];
          ch[j] = temp;
        }
      }
    }   

    //записываем в стек вершины, которые точно входят в оболочку
    h[0] = ch[0];
    h[1] = ch[1]; 

    for (let i = 2; i < ch.length; i++) {
      let vector = {
        'x1': points[ h[h.length - 2] ][1],
        'y1': points[ h[h.length - 2] ][0],
        'x2': points[ h[h.length - 1] ][1],
        'y2': points[ h[h.length - 1] ][0]
      };

      while (this._classify(vector, points[ ch[i] ][1], points[ ch[i] ][0]) < 0) {            
        h.pop(); // пока встречается правый поворот, убираем точку из оболочки
      }
      h.push(ch[i]); // добавляем новую точку в оболочку
    }

    return h;
  }

}

module.exports = RouteService;