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

router.get('/routes', [Auth], (req, res) => {
  res.locals.jsFiles = [
    '/js/routes.js',
    'https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=' + process.env.YANDEX_MAPS_API_KEY
  ];

  res.render('routes/index')
});

module.exports = router;
