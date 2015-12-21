'use strict';
angular.module('gpAppApp').directive('buienradarWidget', function($location, $rootScope, $http, User, $cookieStore, $q, buienradarService, chartConfiguration) {
    return {
        templateUrl: 'components/widgets/buienradar/buienradar.html',
        restrict: 'CEA',
        link: function(scope, element, attrs) {
            scope.chartConfiguration = chartConfiguration;
            var getData = function(coordinates) {
                buienradarService.get({
                    lat: coordinates.coords.latitude,
                    lon: coordinates.coords.longitude
                }).then(function(buienradar) {
                    scope.labels = buienradar.labels;
                    scope.rainfalls = buienradar.rainfalls;
                });
            }
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getData);
            }
        }
    };
});