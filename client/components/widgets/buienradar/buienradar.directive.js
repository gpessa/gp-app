'use strict';

angular.module('gpAppApp').directive('buienradarWidget', ($geolocation, Buienradar, chartConfiguration) => {
  return {
    'templateUrl' : 'components/widgets/buienradar/buienradar.html',
    'restrict' : 'C',
    'require' : '^^widget',
    'link' : function(scope, element, attr, widget) {
      scope.chartConfiguration = chartConfiguration;

      widget.toggleLoading();

      scope.getData = function(coordinates) {

        Buienradar.get({
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
        .finally(widget.toggleLoading);
      }

      $geolocation.getCurrentPosition()
                  .then(scope.getData)
                  .catch((exception) => {
                    scope.error = exception.error;
                  });

    }
  };
});
