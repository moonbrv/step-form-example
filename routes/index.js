var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/step-1', (req, res) => {
  res.render('step-1', { title: 'step-1' });
});

router.post('/step-1', (req, res) => {
  res.render('step-2', { title: 'step-2' });
});

router.get('/step-2', (req, res) => {
  res.render('step-2', { title: 'step-2' });
});

router.get('/step-3', (req, res) => {
  res.render('step-3', { title: 'step-3' });
});

module.exports = router;
