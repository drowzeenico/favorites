const { Router } = require('express');
const Controllers = require('../app/controllers');
const Auth = require('../app/middlewares/auth');

const router = Router();

router.get('/', [Auth], (req, res) => {
  res.locals.jsFiles = [
    '/js/routes.js',
    'https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=' + process.env.YANDEX_MAPS_API_KEY
  ];

  new Controllers.Routes(req, res).index();
});

router.get('/:id', [Auth], (req, res) => {
  new Controllers.Routes(req, res).get();
});

router.get('/nearby/:id', [Auth], (req, res) => {
  new Controllers.Routes(req, res).findNearby();
});

router.post('/', [Auth], (req, res) => {
  new Controllers.Routes(req, res).create();
});

module.exports = router;
