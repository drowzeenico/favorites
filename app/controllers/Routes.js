const BaseController = require('./Base');
const Models = require('../models');
const RoutesData = require('../forms/routes');

const Exceptions = require('../exceptions');

class RoutesController extends BaseController {

  create() {
    const dataObject = new RoutesData(this.req.body);
    if(!dataObject.validate()) {
      return this.error(dataObject.error);
    }

    const data = dataObject.build(this.req.session.user.id);

    Models.Route.create(data).then(res => {
      return this.json(data);
    })
    .catch(err => {
      console.log(err);
      let defaultError = Exceptions.unhundledError(err, 'Error occured while saving route');
      this.resolveError(defaultError, err).error();
    })
  }
 

}

module.exports = RoutesController;