/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: routes
*
*  Copyright (c) 2016. University of Colorado, boulder
*/

var mongoose = require('mongoose');
var Project = require('../models/projects')

module.exports = function(router) {
    // add project 
    router.post('/projects/add', function(req, res, next) {
        console.log('got request!' + req.body.name);
        
        var project = new Project(req.body);
        project.save(function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("Added Record");
        }});

        res.send(req.body);
    });

    // projects page
    router.get('/projects', function(req, res, next) {
        res.render('partials/projects');
    });
    // module.exports = router;
}