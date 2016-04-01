'use strict';

angular
  .module('gpAppApp')
  .directive('widgetBuienradar', ($geolocation, BuienradarResource, userStatus, chartConfiguration) => {
    return {
      'templateUrl' : 'components/widgets/buienradar/buienradar.html',
      'require' : '^^item',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function(scope, element, attr, item) {
        scope.chartConfiguration = angular.copy(chartConfiguration);

        scope.get = function(coordinates) {
          item.toggleLoading();

          scope.buienradar = new BuienradarResource({
            'lat' : coordinates.coords.latitude,
            'lon' : coordinates.coords.longitude
          });

          scope.buienradar
            .$get()
            .catch(error => scope.error = error)
            .finally(() => item.toggleLoading());
        };

        scope.createChart = function(){
          item.toggleLoading();

          $geolocation
            .getCurrentPosition()
            .then(scope.get)
            .catch(exception => scope.error = exception.error)
            .finally(() => item.toggleLoading());
        };

        userStatus.focus(scope.createChart);
        scope.createChart();
      }
    };
  });
