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
                    templateUrl: 'home',
                    //controller: 'mainController'
                })

                // login page
                .when('/login', {
                    templateUrl: 'partials/login',
                    controller: 'loginController'
                })

                // login page
                .when('/projects', {
                    templateUrl: '/projects',
                    controller: 'projectsController'
                })

                .when('/students',{
                    templateUrl: 'students',
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

                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
        }]);