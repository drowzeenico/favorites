const BaseController = require('./Base');
const Models = require('../models');

const LoginForm = require('../forms/login');
const Exceptions = require('../exceptions');
const UserService = require('../services/user');

class AuthController extends BaseController {

  logout() {
    delete this.req.session.user;
    return this.res.redirect('/');
  }

  login() {
    const loginForm = new LoginForm(this.req.body);
    if(!loginForm.validate()) {
      return this.error(loginForm.error);
    }

    const data = loginForm.build();
    const passwordHash = new UserService({password: data.password}).hashPassword();

    Models.User.findOne({
      where: {
        email: data.email
      }
    }).then(user => {
      if(!user || user.password !== passwordHash)
        throw Exceptions.userNotFound();
        
      this.req.session.user = user;
      this.json(user);
    }).catch(err => {
      let defaultError = Exceptions.authentificationFailed(err);
      this.resolveError(defaultError, err).error();
    })

  }

}

module.exports = AuthController;