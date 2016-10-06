/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: user routes
*
*  Copyright (c) 2016. University of Colorado, boulder
*/

module.exports = function(router) {
    /* GET users listing. */
    router.get('/', function(req, res, next) {
      res.send('respond with a resource');
    });

    // module.exports = router;
}