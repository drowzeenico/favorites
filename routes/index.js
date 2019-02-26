const { Router } = require('express');
const Controllers = require('../app/controllers');
const Auth = require('../app/middlewares/auth');

const router = Router();

router.get('/', (req, res) => {
  if(req.session.user)
    return res.redirect('/profile');
  
  res.locals.jsFiles = [
    '/js/forms/registration.js',
    '/js/forms/login.js'
  ];
  res.render('index');
});

router.get('/profile', [Auth], (req, res) => {
  new Controllers.Profile(req, res).index();
});

module.exports = router;
