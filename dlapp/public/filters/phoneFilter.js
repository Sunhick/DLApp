/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: telephone filters
*  @Credits: http://stackoverflow.com/questions/12700145/format-telephone-and-credit-card-numbers-in-angularjs
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').filter('tel', function () {
    "use strict";
    
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10:
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11:
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12:
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);
        return (country + " (" + city + ") " + number).trim();
    };
});