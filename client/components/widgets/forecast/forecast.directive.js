'use strict';

angular.module('gpAppApp').directive('forecastWidget', ($geolocation, forecastService, userStatus, formats, widgetList) => {
  return {
    'templateUrl' : 'components/widgets/forecast/forecast.html',
    'restrict' : 'C',
    'require' : '^^widget',
    'link' : function(scope, element, attr, widget) {
      widgetList.add({
        'name' : 'Forecast',
        'type' : 'forecast',
        'icon' : 'fa fa-sun-o'
      });
      scope.formats = formats;

      scope.getIcon = function(icon){
        return {
          'clear-day'           : 'iw-sun-1',
          'snow'                : 'iw-snow',
          'partly-cloudy-day'   : 'iw-partly-cloudy-1',
          'partly-cloudy-night' : 'iw-partly-cloudy-3',
          'rain'                : 'iw-heavy-rain-1',
          'cloudy'              : 'iw-mostly-cloudy-2'
        }[icon];
      }

      scope.get = function(coordinates) {
        forecastService.get({
          'lat' : coordinates.coords.latitude,
          'lon' : coordinates.coords.longitude
        })
        .then(forecast => {
          scope.forecast = forecast;
        })
        .catch((error) => {
          scope.error = error;
        })
        .finally(widget.toggleLoading);
      };

      scope.getData = function(){
        widget.toggleLoading();
        $geolocation.getCurrentPosition()
                    .then(scope.get)
                    .catch((exception) => {
                      scope.error = exception.error;
                    });
      };


      userStatus.focus(scope.getData);
      scope.getData();
    }
  };
});
