/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: routes
*
*  Copyright (c) 2016. University of Colorado, boulder
*/

var Project = require("../models/projects")
var excel = require("node-excel-export");
var fs = require("fs")
module.exports = function(router) {
    // add project
    router.post("/projects/add", function(req, res, next) {
        //console.log("got request!" + req.body);
        var prj = new Project(req.body);

        prj.save(function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("Added Record");
        }});

        res.send(req.body);
    });

    router.post("/projects/update", function(req, res, next) {
        //console.log("got request in update script...!" + req.body);
        var data = req.body;
        Project.findOneAndUpdate({title: req.body.title}, {$set:{updatedCount: req.body.updatedCount}},function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("Updated Record");
            }
        });

        res.send(req.body);
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

    router.post("/projects/report", function(req, res, next){
      var data = req.body;
      console.log(data.specification)
      var report = excel.buildExport([
        {
          name: "Sheet1",
          specification: data.specification,
          data: data.dataset
        }
      ]);
      fs.writeFile("../report.xlsx", report);
      // res.download('../report.xlsx');
      //res.send("done");
      // return res.send(report);
      return res.send('done');
    });

    router.get('/projects/getcsv', function(req, res, next) {
        return res.download('../report.xlsx');
    });
}
