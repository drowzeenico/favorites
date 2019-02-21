const Base = require('./base');
const Exceptions = require('../exceptions');
const RouteService = require('../services/route');

class RoutesData extends Base {

  validate() {
    if(!this._checkRequiredFields())
      return this.valid;

    return this.valid;
  }

  _checkRequiredFields() {
    const required = ['name', 'coords'];
    console.log(this.data)
    let fields = required.filter(f => !this.data[f]);

    if(fields.length > 0) {
      this.error = Exceptions.fieldIsRequired({fields: fields});
      this.valid = false;      
    }

    return this.valid;
  }

  build() {
    const service = new RouteService({coords: this.data.coords});
    service.calculateMinimumConvexHull();
    this.data.coords = service.route.minimumConvexHull;
    return this.data;
  }

}

module.exports = RoutesData;