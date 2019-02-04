const { Router } = require('express');
const router = Router();

const Controllers = require('../app/controllers');

router.get('/logout', (req, res) => {
  new Controllers.Auth(req, res).logout();
});

router.post('/', (req, res) => {
  new Controllers.Auth(req, res).login();
});

module.exports = router;
