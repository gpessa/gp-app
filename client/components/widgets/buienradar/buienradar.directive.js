'use strict';
angular.module('gpAppApp').directive('buienradarWidget', function($location, $rootScope, $http, User, $cookieStore, $q, Buienradar, chartConfiguration) {
    return {
        'templateUrl' : 'components/widgets/buienradar/buienradar.html',
        'restrict' : 'C',
        'require' : '^^widget',
        'controller' : 'BuienradarController',
        'controllerAs' : 'buienradar'
    };
});
