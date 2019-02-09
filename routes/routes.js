const { Router } = require('express');
const Controllers = require('../app/controllers');

const router = Router();

router.get('/', (req, res) => {
  res.json({routes: true})
});

router.post('/', (req, res) => {
  new Controllers.Routes(req, res).create();
});

module.exports = router;
