const BaseController = require('./Base');
const Models = require('../models');

const Exceptions = require('../exceptions');
const UserService = require('../services/user');

class RoutesController extends BaseController {

  create() {
    this.json(this.req.body)
  }
 

}

module.exports = RoutesController;