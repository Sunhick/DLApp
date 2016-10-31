/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: student controller
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('studentController',['$scope','$resource',function($scope,$resource) {
    "use strict";
    var Student = $resource('/student/add');

    $scope.options = [{
	    name: 'American Indian or Alaskan Native',
	    value: false,
	  }, {
	    name: 'Black or African-American',
	    value: false
	  }, {
	    name: 'Native Hawaiian or other Pacific Islander',
	    value: false
	  }, {
	    name: 'Asian',
	    value: false
	  }, {
	    name: 'White',
	    value: false
	  }, {
	  	name: 'Other',
	  	value: false
	  }, {
	    name: 'Do Not Wish to Provide',
	    value: false
	  }];

	 $scope.isRaceInvalid = function(){
		var i;
    	var raceInvalid = true;
    	for(i=0 ; i < $scope.options.length; i++){
			if($scope.options[i].value) {
				raceInvalid = false;
				break;
    	  	}
    	 }
    	 return raceInvalid;
	};

	$scope.populateSummerAddress = function(data){
    	if(data.sameAddress){
    		$scope.data.addressLine1Summer = data.addressLine1Boulder;
    		$scope.data.addressLine2Summer = data.addressLine2Boulder;
    		$scope.data.citySummer = data.cityBoulder;
    		$scope.data.stateSummer = data.stateBoulder;
    		$scope.data.zipSummer = data.zipBoulder;
    		$scope.data.countrySummer = 'US';
    		$scope.data.phoneNumberSummer = data.phoneNumberBoulder;
    		$scope.data.emailSummer = data.emailBoulder;
    	} else {
    		$scope.data.addressLine1Summer = '';
    		$scope.data.addressLine2Summer = '';
    		$scope.data.citySummer = '';
    		$scope.data.stateSummer = '';
    		$scope.data.zipSummer = '';
    		$scope.data.countrySummer = '';
    		$scope.data.phoneNumberSummer = '';
    		$scope.data.emailSummer = '';
    	}
    }

    $scope.addStudent = function(data) {
    	//Formatting race values selected 
    	var i;
    	var race_values='';

    	for(i=0 ; i < $scope.options.length; i++){
			if($scope.options[i].value) {
				//alert($scope.options[i].name);
    	  		if(race_values != ''){
    	  			race_values = race_values +','+ $scope.options[i].name;
    	  		} else {
    	  			race_values = $scope.options[i].name;
    	  		}
    	  	}
    	 }

        var student = new Student(data);
        student.countryBoulder = 'US';
        student.race = race_values;
        student.$save(function(result) {
            console.log('Student added..');
         });
    };
}]);
