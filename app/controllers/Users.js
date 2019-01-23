//const UserModel = require('../models/User');
const BaseController = require('./Base');
const seq = require('../models');
console.log(seq)

class UsersController extends BaseController {

  index() {
    return this.res.json({
      title: 'Here we are'
    })
  }

}

module.exports = UsersController;