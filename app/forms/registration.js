const Base = require('./base');
const Exceptions = require('../exceptions');

class RegistrationForm extends Base {

  validate() {
    if(!this._checkRequiredFields())
      return this.valid;

    if(!this._isPasswordsMatch())
      return this.valid;
  }

  _checkRequiredFields() {
    const required = ['firstName', 'lastName', 'password', 'repeatPassword', 'birthday', 'gender'];
    let fields = required.filter(f => !this.data[f]);

    if(fields.length > 0)
      this.error = Exceptions.fieldIsRequired({fields: fields});

    return this.valid;
  }

  _isPasswordsMatch() {
    if(this.data.password !== this.data.repeatPassword) {
      this.error = Exceptions.passwordsAreMismatched();
      this.valid = false;
    }
    else
      delete this.data.repeatPassword;
    
    return this.valid;
  }
}

module.exports = RegistrationForm;