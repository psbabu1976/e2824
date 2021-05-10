var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/pages/:page', function(req, res, next) {
  res.render('pages/' + req.params.page);
});
router.get('/templates/:page', function(req, res, next) {
  res.render('templates/' + req.params.page);
});
router.get('/component/:component', function(req, res, next) {
  res.render('component', {component:  req.params.component});
  // test
});

module.exports = router;
