/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: student controller
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('studentController',['$scope','$resource',function($scope,$resource) {
    "use strict";
    var Student = $resource('/student/add');

    $scope.addStudent = function(data) {
        var student = new Student(data);
        student.$save(function(result) {
            console.log('Student added..');
         });
    };
}]);
