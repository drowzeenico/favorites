const Exceptions = require('../exceptions');

class BaseController {

  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.errorObject = null;
  }

  resolveError(defaultError, currentError) {
    this.errorObject = defaultError;
    if(currentError.name && Exceptions[currentError.name])
      this.errorObject = Exceptions[currentError.name](currentError);

    return this;
  }

  json(response, success = true, status = 200) {
    response.success = success;
    this.res.status(status).json(response);
  }

  error(e) {
    if(e != null)
      this.errorObject = e;

    if(process.isProd()) {
      delete this.errorObject.payload;
      delete this.errorObject.name;
    }

    this.json(this.errorObject, false, this.errorObject.status || 500);
  }

}

module.exports = BaseController;