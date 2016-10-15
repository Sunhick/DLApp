/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: Login controller 
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('loginController', ['$http', '$uibModalInstance',
 function($http, $modalInstance) {
    "use strict";
    
    var self = this;
    self.status = "";

    self.Submit = function(login) {   
        console.log("submit clicked " + login.email + login.pword);
    };

    self.register = function(register) {
        console.log("register clicked " + register.email + register.confirmEmail + 
            register.password + register.confirmPassword);
        $http.post("/login/register", register)
            .then(function(response) {
                self.status = response.data;
        });
    };

    self.login = function(login) {
        console.log("login clicked " + login.email + login.password);

        $http.post("/login/auth", login).then(function(response) {
            var data = response.data;
            if (data.type == "error") {
                self.status = data.reason;
            } else if (data.type == "success") {
                // sucessful authentication
                $modalInstance.close({});
            }
        });
    };

    self.cancel = function() {
        $modalInstance.dismiss("cancel");
    };
}]);