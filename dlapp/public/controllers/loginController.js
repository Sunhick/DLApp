/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: Login controller 
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('loginController', ['$http', function($http) {
    var self = this;
    self.Submit = function(login) {   
        console.log("submit clicked " + login.email + login.pword);
    };

    self.register = function(register) {
        console.log("register clicked " + register.username + register.email + register.password);
        $http.post("/login/register", register)
            .then(function(response) {
                
        });
    };
}]);