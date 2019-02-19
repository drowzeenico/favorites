const { Router } = require('express');
const Controllers = require('../app/controllers');
const Auth = require('../app/middlewares/auth');

const router = Router();

router.get('/', [Auth], (req, res) => {
  res.json({routes: true})
});

router.post('/', [Auth], (req, res) => {
  new Controllers.Routes(req, res).create();
});

module.exports = router;
