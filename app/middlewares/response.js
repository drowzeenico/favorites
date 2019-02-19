
const ViewHelper = require('../services/view');

module.exports = (req, res, next) => {

  // custom js file for current page
  res.locals.jsFiles = [];

  // helpers
  if(req.session.user) {
    res.locals.user = req.session.user;
    res.locals.user.fullName = ViewHelper.usersFullName(req.session.user);
  }
  next();
}