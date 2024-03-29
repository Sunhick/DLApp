/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: Angular Routes for SPA
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {
                "use strict";
                
                $routeProvider
                
                // home page
                .when('/', {
                    templateUrl: 'partials/home'
                })

                // login page
                .when('/login', {
                    templateUrl: 'partials/login',
                    controller: 'loginController'
                })

                // projects page
                .when('/projects', {
                    templateUrl: 'partials/projects',
                    controller: 'projectsController'
                })

                .when('/students',{
                    templateUrl: 'partials/students',
                    controller: 'studentController'
                })

                .when('/faculty', {
                    templateUrl: 'partials/faculty',
                    controller: 'facultyController'
                })

                .when('/contactus', {
                    templateUrl: 'partials/contactus',
                    controller: 'contactusController'
                })

                .when('/success', {
                    templateUrl: 'partials/success'
                })

                .when('/student_success', {
                    templateUrl: 'partials/student_success'
                })

                .when('/match', {
                    templateUrl: 'partials/match',
                    controller: 'matchController'
                })

                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
        }]);