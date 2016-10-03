/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: routes
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout');
});

router.get('/home', function(req, res, next) {
    res.render('home');
});

router.get('/partials/login', function(req, res, next) {
    res.render('partials/login');
});

router.get('/partials/faculty', function(req, res, next) {
    res.render('partials/faculty');
});

router.get('/students', function(req, res, next) {
    res.render('students');
});

module.exports = router;
