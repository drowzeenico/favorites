const Base = require('./base');
const Exceptions = require('../exceptions');

class LoginForm extends Base {

  validate() {
    if(!this._checkRequiredFields())
      return this.valid;

    return this.valid;
  }

  _checkRequiredFields() {
    const required = ['email', 'password'];
    let fields = required.filter(f => !this.data[f]);

    if(fields.length > 0) {
      this.error = Exceptions.fieldIsRequired({fields: fields});
      this.valid = false;      
    }

    return this.valid;
  }

}

module.exports = LoginForm;