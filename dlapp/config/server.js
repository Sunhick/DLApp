/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: config file for web server
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
module.exports = {

    logging : {
        // level: 'info',
        // name: 'mush.js'
    },

    server : { port : process.env.WEB_PORT || 4000 }
};