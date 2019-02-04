const BaseController = require('./Base');
const Models = require('../models');

const RegistrationForm = require('../forms/registration');
const Exceptions = require('../exceptions')

class UsersController extends BaseController {

  index() {
    return this.json({
      title: 'Here we are'
    })
  }

  create() {
    const registrationForm = new RegistrationForm(this.req.body);
    if(!registrationForm.validate()) {
      return this.error(registrationForm.error);
    }

    Models.User.create(registrationForm.build()).then(user => {
      return this.json({
        success: true,
        user: user
      })
    })
    .catch(err => {
      let defaultError = Exceptions.unhundledError(err, 'Error occured while creating new user');
      this.resolveError(defaultError, err).error();
    })

    
  }

}

module.exports = UsersController;