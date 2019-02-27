const BaseController = require('./Base');
const Models = require('../models');
const RoutesData = require('../forms/routes');

const Exceptions = require('../exceptions');

class RoutesController extends BaseController {

  index() {
    Models.Route.findAll({
      where: {user_id: this.req.session.user.id}
    })
    .then(items => {
      this.res.render('routes/index', {routesList: items});
    });
  }

  get() {
    Models.Route.find({
      where: {
        user_id: this.req.session.user.id, 
        id: this.req.params.id
      }
    })
    .then(items => {
      this.json(items);
    });
  }

  create() {
    const dataObject = new RoutesData(this.req.body);
    if(!dataObject.validate()) {
      return this.error(dataObject.error);
    }

    const data = dataObject.build(this.req.session.user.id);

    Models.Route.create(data).then(res => {
      return this.json(data);
    })
    .catch(err => {
      console.log(err);
      let defaultError = Exceptions.unhundledError(err, 'Error occured while saving route');
      this.resolveError(defaultError, err).error();
    })
  }

  findNearby() {
    Models.Route.findNearbyRoutes(this.req.params.id, this.req.session.user.id)
    .then(items => {
      this.json({
        routes: items || []
      });
    }).catch(err => {
      console.log(err);
      let defaultError = Exceptions.unhundledError(err, 'Error occured while serching routes');
      this.resolveError(defaultError, err).error();
    });
  }
 

}

module.exports = RoutesController;