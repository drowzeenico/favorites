const BaseController = require('./Base');
const Models = require('../models');

const RegistrationForm = require('../forms/registration');
const Exceptions = require('../exceptions')

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

    Models.User.create(registrationForm.build())
    .then(data => {
      return this.res.json({
        title: 'Success'
      })
    })
    .catch(err => {
      let error = Exceptions.unhundledError(err, 'Error occured while creating new user');
      if(err.name && Exceptions[err.name])
        error = Exceptions[err.name](err);

      return this.error(error);
    })

    
  }

}

module.exports = UsersController;