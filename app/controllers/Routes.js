const BaseController = require('./Base');
const Models = require('../models');
const RoutesData = require('../forms/routes');

const Exceptions = require('../exceptions');
const UserService = require('../services/user');

class RoutesController extends BaseController {

  create() {
    const dataObject = new RoutesData(this.req.body);
    if(!dataObject.validate()) {
      return this.error(dataObject.error);
    }

    const data = dataObject.build();
    this.json(data);
  }
 

}

module.exports = RoutesController;