/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: main controller 
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('mainController', []).controller('mainController', function(){
    var self = this;
    self.activeMenu = "Home";
    self.headerMenus = [
        { name: "Home", link: "/home", glyphicon: "glyphicon glyphicon-home" },
        { name: "Students", link: "/students" },
        { name: "Faculty", link:"/faculty" },
        { name: "Projects", link:"/projects" },
        { name: "Contact Us", link:"/" }
    ];

    self.activate = function(selectedIndex) {
        self.activeMenu = self.headerMenus[selectedIndex].name;
    };
});