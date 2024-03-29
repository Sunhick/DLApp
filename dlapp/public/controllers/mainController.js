/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: main controller 
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('mainController', ['$uibModal', function($modal) {
    "use strict";
    
    var self = this;
    self.activeMenu = "Home";
    self.headerMenus = [
        { name: "Students", link: "/students" },
        { name: "Faculty", link:"/faculty" },
        { name: "Projects", link:"/projects" },
        { name: "Auto-Match", link:"/match"},
        { name: "Contact Us", link:"/contactus" }
    ];

    self.activate = function(selectedIndex) {
        self.activeMenu = self.headerMenus[selectedIndex].name;
    };

    self.loginDialog = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/login',
            controller: 'loginController as loginCtrl',
            backdrop: 'static'
        });
    };
}]);