/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: routes
*
*  Copyright (c) 2016. University of Colorado, boulder
*/

var Project = require("../models/projects")

module.exports = function(router) {
    // add project 
    router.post("/projects/add", function(req, res, next) {
        console.log("got request!" + req.body.name);
        
        var prj = new Project(req.body);

        prj.save(function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("Added Record");
        }});

        res.send(req.body);
    });

    // projects page
    router.get("/projects", function(req, res, next) {
        res.render("partials/projects");
    });

    router.get("/projects/list", function(req, res, next) {
        var projects = [];
        
        // query mongo db for the list of registered projects
        Project.find({}, function(err, records) {
            records.forEach(function(record) {
                var project = {};
                project = record;
                projects.push(project);
            });

            res.send(projects);
        });
    });
    // module.exports = router;
}