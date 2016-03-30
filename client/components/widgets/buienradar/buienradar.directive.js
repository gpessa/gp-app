'use strict';

angular
  .module('gpAppApp')
  .directive('widgetBuienradar', ($geolocation, buienradarService, userStatus, chartConfiguration, formats) => {
    return {
      'templateUrl' : 'components/widgets/buienradar/buienradar.html',
      'require' : '^^item',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function(scope, element, attr, item) {
        scope.chartConfiguration = chartConfiguration;

        scope.get = function(coordinates) {
          item.toggleLoading();
          
          buienradarService
            .get({
              'lat' : coordinates.coords.latitude,
              'lon' : coordinates.coords.longitude
            })
            .then(buienradar => {
              scope.labels = buienradar.labels;
              scope.rainfalls = buienradar.rainfalls;
            })
            .catch((error) => {
              scope.error = error;
            })
            .finally(() => item.toggleLoading());
        };

        scope.createChart = function(){
          $geolocation
            .getCurrentPosition()
            .then(scope.get)
            .catch((exception) => {
              scope.error = exception.error;
            });
        };

        userStatus.focus(scope.createChart);
        scope.createChart();

      }
    };
  });
