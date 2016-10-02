/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: main controller 
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
var mainCtrl = angular.module('dlapp');
mainCtrl.controller('mainController', function(){
    var self = this;
    self.activeMenu = "Home";
    self.headerMenus = [
        { name: "Home", link: "#", glyphicon: "glyphicon glyphicon-home" },
        { name: "Students", link: "#" },
        { name: "Faculty", link:"#" },
        { name: "Contact Us", link:"#" }
    ];

    self.activate = function(selectedIndex) {
        self.activeMenu = self.headerMenus[selectedIndex].name;
    };
});