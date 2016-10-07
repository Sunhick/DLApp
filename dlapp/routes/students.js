/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: routes
*
*  Copyright (c) 2016. University of Colorado, boulder
*/

module.exports = function(router) {

    router.get('/students', function(req, res, next) {
        res.render('students');
    });

    router.post('/students/register', function(req, res, next) {
        var data = req.body;
        console.log('Got the data' + data.firstName + data.lastName);
    });

    // module.exports = router;
}