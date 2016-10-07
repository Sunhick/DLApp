/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: student controller
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('studentController', function($http){
    var self = this;
    self.data = {};
<<<<<<< HEAD

    var Register = $resource('/students/register');
=======
>>>>>>> f519eb41f6b6150af226b8510c8b1d85f5159f3d

    self.submit = function(data) {
        console.log(data);
        $http.post('/students/register', data);
    }
});
