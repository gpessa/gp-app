'use strict';

angular
  .module('gpAppApp')
  .directive('widgetBuienradar', ($geolocation, buienradarService, userStatus, chartConfiguration, formats) => {
    return {
      'templateUrl' : 'components/widgets/buienradar/buienradar.html',
      'require' : '^^widget',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function(scope, element, attr, widget) {
        scope.chartConfiguration = chartConfiguration;

        scope.get = function(coordinates) {
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
            .finally(widget.toggleLoading());
        };

        scope.createChart = function(){
          widget.toggleLoading();
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
