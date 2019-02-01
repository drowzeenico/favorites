const crypto = require('crypto');
const Base = require('./base');
const Exceptions = require('../exceptions');

class RegistrationForm extends Base {

  validate() {
    if(!this._checkRequiredFields())
      return this.valid;

    if(!this._isPasswordsMatch())
      return this.valid;

    return this.valid;
  }

  _checkRequiredFields() {
    const required = ['firstName', 'lastName', 'email', 'password', 'repeatPassword', 'birthday', 'gender'];
    let fields = required.filter(f => !this.data[f]);

    if(fields.length > 0) {
      this.error = Exceptions.fieldIsRequired({fields: fields});
      this.valid = false;      
    }

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

  build() {
    const salt = process.env.PASSWORD_SALT;
    let hash = crypto.createHmac('sha256', salt);
    hash.update(this.data.password, 'utf8').digest('hex');
    this.data.password = hash;
    console.log(this.data)
    return this.data;
  }
}

module.exports = RegistrationForm;