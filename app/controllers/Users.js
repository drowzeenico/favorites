const BaseController = require('./Base');
const Models = require('../models');

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

    Models.User.create(registrationForm.build())
    .then(data => {
      return this.res.json({
        title: 'Success'
      })
    })
    .catch(err => {
      return this.res.status(422).json({
        title: 'Failed',
        ...err
      })
    })

    
  }

}

module.exports = UsersController;