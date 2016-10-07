/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: student controller
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('studentController', function($http, $resource){
    var self = this;
    self.data = {};

    var Register = $resource('/students/register');

    self.submit = function(data) {
        console.log(data);
        // $http.post('/students/register', data);
        var register = new Register();
    }
});


angular.module('dlapp').controller('studentController',['$scope',function($scope){
  $scope.showBackgroundCheck = function () {
    if ($scope.backgroundCheck == "yes") {
      return true;
    }
    return false;
  };

  $scope.showAwarenessTraining2 = function() {
    if ($scope.awarenessTraining == "no" ){
      return true;
    }
    return false;
  };

  $scope.showAwarenessTraining = function() {
    console.log($scope.awarenessTraining);
    if ($scope.awarenessTraining == "yes"){
      return true;
    }
    return false;
  };

}]);
