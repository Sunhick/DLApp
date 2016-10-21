/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: project controller 
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('projectsController', ['$http', function($http){
    "use strict";
    
    var self = this;

    // Get the list of projects from the backend(db)
    // Todo: if the list is too big, try local caching(angular local storage or http cache?)
    self.getProjectsList = function() {
        var config = { cache: false };
        $http.get("/projects/list", config).then(function(response) {
            self.projects = response.data;
        });
    }();

    // Todo : move this code to the faculty controller
    self.submitProject = function(project) {
        // create the data
        var data = { title: project.title };
        console.log(project.title);
        // post the data
        $http.post("/projects/add", data)
            .then(function(response) {
                self.projects.push(response.data);
            });
    };

    self.setSelection = function(project) {
        self.selectedProject = project;
    };
}]);