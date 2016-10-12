/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: routes
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
var path = require('path');

module.exports = function(router) {

    router.use('/partials/:page', function(req, res, next) {
        res.render(path.join('partials',req.params.page));
    });

    router.post('/login/register', function(req, res, next) {
        var data = req.body;
        console.log("register clicked " + data.username + data.email + data.password);
    });

    // module.exports = router;
}