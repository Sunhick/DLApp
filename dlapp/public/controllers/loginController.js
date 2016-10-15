/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: Login controller 
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('loginController', ['$http', '$uibModalInstance', function($http, $modalInstance) {
    "use strict";
    
    var self = this;

    self.href = "#signup";

    self.Submit = function(login) {   
        console.log("submit clicked " + login.email + login.pword);
    };

    self.register = function(register) {
        console.log("register clicked " + register.username + register.email + register.password);
        $http.post("/login/register", register)
            .then(function(response) {
                
        });
    };

    self.login = function() {
        console.log(" login clicked " + this.username + this.password);

        // close modal dialog
        $modalInstance.close({});
    };

    self.cancel = function() {
        $modalInstance.dismiss("cancel");
    };
}]);

$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})