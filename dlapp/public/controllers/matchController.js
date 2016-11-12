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
            studentName: "John cart",
            assigned: "Project-1"
        },
        {
            studentName: "Lucy meyers",
            assigned: "Project-4"
        },
        {
            studentName: "William Luck",
            assigned: "Project-3"
        },
        {
            studentName: "Sunil Murthy",
            assigned: "Project-2"
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
        self.tempAssigned = self.selectedStudent.assigned;
    };
}]);