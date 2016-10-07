/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: routes
*
*  Copyright (c) 2016. University of Colorado, boulder
*/

module.exports = function(router) {

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

    router.post('/login/register', function(req, res, next) {
        var data = req.body;
        console.log("register clicked " + data.username + data.email + data.password);
    });

    router.get('/partials/faculty', function(req, res, next) {
        res.render('partials/faculty');
    });

    router.get('/partials/contactus', function(req, res, next) {
        res.render('partials/contactus')
    });

    // module.exports = router;
}