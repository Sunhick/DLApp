/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: project controller
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('projectsController', ['$scope', '$http', 'ListProjects', function($scope, $http, ListProjects){
    "use strict";

    var self = this;
    self.projects=[];
    //
    // // Get the list of projects from the backend(db)
    // // Todo: if the list is too big, try local caching(angular local storage or http cache?)
    // self.getProjectsList = function() {
    //     var config = { cache: false };
    //     $http.get("/projects/list", config).then(function(response) {
    //         self.projects = response.data;
    //     });
    // }();

    ListProjects.getProjectsList().then(function(data){
      self.projects = data;
      //console.log(self.projects);
    });


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
}])

.factory('ListProjects', ['$http',
function ($http) {
  return {
    getProjectsList: function(){
      return $http.get("/projects/list").then(function(response) {
        //console.log(response.data);
        return response.data;
      });
    }
  };

}]);
