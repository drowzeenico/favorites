const BaseController = require('./Base');
const Models = require('../models');

const Exceptions = require('../exceptions');
const UserService = require('../services/user');

class ProfileController extends BaseController {

  index() {
    return this.res.render('profile/index');
  }
 

}

module.exports = ProfileController;