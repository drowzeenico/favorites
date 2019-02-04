const crypto = require('crypto');

class UserService {

  constructor(user) {
    this.user = user;
  }

  hashPassword() {
    const salt = process.env.PASSWORD_SALT;
    let Hmac = crypto.createHmac('sha256', salt);
    Hmac.update(this.user.password);
    return Hmac.digest('hex');
  }

}

module.exports = UserService;