const { Router } = require('express');
const router = Router();

const Controllers = require('../app/controllers');

router.get('/', (req, res) => {
  new Controllers.Users(req, res).index();
});

module.exports = router;
