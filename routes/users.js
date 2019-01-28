const { Router } = require('express');
const router = Router();

const Controllers = require('../app/controllers');

router.get('/', (req, res) => {
  new Controllers.Users(req, res).index();
});

router.post('/', (req, res) => {
  new Controllers.Users(req, res).create();
});

module.exports = router;
