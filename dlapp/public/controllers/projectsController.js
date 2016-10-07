/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: project controller 
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('projectsController', function($http){
    var self = this;
    self.projects = [
        { name : "project-22" },
        { name : "Level it" }
    ];

    self.submitProject = function(project) {
        // create the data
        var data = { name: project.name };

        // post the data
        $http.post("/projects/add", data)
            .then(function(response) {
                self.projects.push(data);
            });
    }
});