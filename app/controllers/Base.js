
class BaseController {

  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  error(e) {
    if(process.isProd())
      delete e.payload;

    this.res.status(e.status || 500);
    this.res.json(e);
  }

}

module.exports = BaseController;