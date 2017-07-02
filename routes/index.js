var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/step-1', (req, res) => {
  res.render('step-1', { title: 'step-1' });
});

router.get('/step-2', (req, res) => {
  res.render('step-2', { title: 'step-2' });
});

router.get('/step-3', (req, res) => {
  res.render('step-3', { title: 'step-3' });
});

router.get('/success', (req, res) => {
  res.render('success', { title: 'success' });
});

router.post('/finish', (req, res) => {
  res.location('/success');
  res.send()
});

router.get('/get-city', (req, res) => {
  const city = req.query.city
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&language=ru_RU&key=AIzaSyB0rs_cBlpQa0Psztp7ky_f8AtKDfXAXZg`
  axios.get(url)
    .then(resObj => {
      res.json(resObj.data)
    })
    .catch(err => {
      console.error(err)
    })
});

module.exports = router;
