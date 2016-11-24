/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: faculty controller
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('facultyController', ['$http', '$scope', '$location',
 function($http, $scope, $location) {
    "use strict";

    var self = this;

    self.submit = function(project) {
        var areas = [];
        for (var key in project.areas) {
          if (project.areas.hasOwnProperty(key)) {
            areas.push(key);
          }
        }
        project.areas = areas;
        project.updatedCount = 0;
        
        if(project.natureWrk == "others")
          project.natureWrk = $scope.natureWrk;
        if(project.priorWrk == "others")
          project.priorWrk = $scope.priorWrk;
          //console.log(project);
        
        // post the data
        $http.post("/projects/add", project)
            .then(function(response) {
                // reset the fields or show successfully added message.
                $location.path("/success");
            });
    };
}]);
