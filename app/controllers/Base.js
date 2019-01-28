
class BaseController {

  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  error(e) {
    this.res.status(e.status);
    this.res.json(e);
  }

}

module.exports = BaseController;