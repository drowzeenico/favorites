const BaseController = require('./Base');
const seq = require('../models');

const RegistrationForm = require('../forms/registration');

class UsersController extends BaseController {

  index() {
    return this.res.json({
      title: 'Here we are'
    })
  }

  create() {
    const registrationForm = new RegistrationForm(this.req.body);
    if(!registrationForm.validate()) {
      return this.error(registrationForm.error);
    }

    return this.res.json({
      title: 'Sup, guys!'
    })
  }

}

module.exports = UsersController;