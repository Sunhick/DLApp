/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: user routes
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
