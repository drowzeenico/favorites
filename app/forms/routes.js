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

  build(user_id) {
    const service = new RouteService({coords: this.data.coords});
    service.calculateMinimumConvexHull();
    
    this.data.area = service.route.minimumConvexHull;
    this.data.user_id = user_id;
    this.data.original = this.data.coords;
    delete this.data.coords;

    return this.data;
  }

}

module.exports = RoutesData;