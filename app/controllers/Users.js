const BaseController = require('./Base');
const seq = require('../models');

class UsersController extends BaseController {

  index() {
    return this.res.json({
      title: 'Here we are'
    })
  }

}

module.exports = UsersController;