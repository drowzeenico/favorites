const { Router } = require('express');
const router = Router();

const Controllers = require('../app/controllers');
const Auth = require('../app/middlewares/auth');

router.get('/', [Auth], (req, res) => {
  new Controllers.Users(req, res).index();
});

router.post('/', (req, res) => {
  new Controllers.Users(req, res).create();
});

module.exports = router;
