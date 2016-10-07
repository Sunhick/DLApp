/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: faculty controller 
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('facultyController', function($http){
    var self = this;

    self.submit = function(project) {
        console.log(project);
        // post the data
        $http.post("/projects/add", project)
            .then(function(response) {
                // reset the fields or show successfully added message.
            });
    }
});