/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: student controller 
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('studentController', function($http){
    var self = this;
    self.data = {};

    self.submit = function(data) {
        console.log(data);
        $http.post('/students/register', data);
    }
});