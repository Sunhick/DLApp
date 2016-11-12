/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: match controller 
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('matchController', ['$http', function($http) {
    "use strict";
    var self = this;

    // dummy data, to be fetched from backend
    self.matches = [
        {
            studentName: "John",
            project1: "project-a-1",
            project2: "project-a-2",
            project3: "project-a-3",
            project4: "project-a-4",
            project5: "project-a-5",
        },
        {
            studentName: "Lucy",
            project1: "project-b-1",
            project2: "project-b-2",
            project3: "project-b-3",
            project4: "project-b-4",
            project5: "project-b-5",
        },
        {
            studentName: "William",
            project1: "project-c-1",
            project2: "project-c-2",
            project3: "project-c-3",
            project4: "project-c-4",
            project5: "project-c-5",
        },
        {
            studentName: "Sunny",
            project1: "project-d-1",
            project2: "project-d-2",
            project3: "project-d-3",
            project4: "project-d-4",
            project5: "project-d-5",
        },
    ];

    self.getAutoMatch = function() {
        $http.get("<url here>").then(function(response) {
            // console.log(response)
            return response.data;
        });
    };

    self.setSelection = function(student) {
        self.selectedStudent = student;
    };
}]);