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

        // Chart
        scope.colors = () => {
          return undefined;
        };

        scope.columns = [{
          id : 'rainfall',
          type : 'area',
          name : 'Rainfall'
        }];

        scope.x = {
          id : 'time',
          type : 'area',
          name : 'Total'
        };

        scope.get = (coordinates) => {
          item.toggleLoading();

          scope.buienradar = BuienradarResource
            .get({
              'latitude' : coordinates.coords.latitude,
              'longitude' : coordinates.coords.longitude
            })
            .$promise
            .then((result) => {
              scope.buienradar.data = result.data;
            })
            .catch(error => scope.error = error)
            .finally(() => item.toggleLoading());
        };

        scope.createChart = () => {
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
