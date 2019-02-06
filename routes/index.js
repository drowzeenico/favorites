const { Router } = require('express');
const Controllers = require('../app/controllers');

const router = Router();

router.get('/', (req, res) => {
  if(req.session.user)
    return res.redirect('/profile');

  res.render('index');
});

router.get('/profile', (req, res) => {
  new Controllers.Profile(req, res).index();
});

module.exports = router;
