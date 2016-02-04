'use strict';
angular.module('gpAppApp').directive('buienradarWidget', function($location, $rootScope, $http, User, $cookieStore, $q, buienradarService, chartConfiguration) {
    return {
        'templateUrl' : 'components/widgets/buienradar/buienradar.html',
        'restrict' : 'CEA',
        'require' : '^^widget',
        link: function(scope, element, attrs, widget) {
          scope.chartConfiguration = chartConfiguration;

          var getData = function(coordinates) {
            widget.toggleLoading();
            buienradarService.get({
                lat: coordinates.coords.latitude,
                lon: coordinates.coords.longitude
            }).then(function(buienradar) {
                widget.toggleLoading();
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
