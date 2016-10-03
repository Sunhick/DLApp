/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: Angular Routes for SPA
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {
                $routeProvider
                
                // home page
                .when('/', {
                    templateUrl: 'home',
                    controller: 'mainController'
                })

                // login page
                .when('/login', {
                    templateUrl: 'partials/login',
                    controller: 'loginController'
                })

                .when('/students',{
                    templateUrl: 'students',
                    controller: 'studentController'
                })

                .when('/faculty', {
                    templateUrl: 'partials/faculty',
                    controller: 'facultyController'
                })

                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
        }]);