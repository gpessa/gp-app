'use strict';

angular
  .module('gpAppApp')
  .directive('widgetForecast', ($geolocation, forecastService, userStatus, formats) => {
    return {
      'templateUrl' : 'components/widgets/forecast/forecast.html',
      'require' : '^^widget',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function(scope, element, attr, widget) {
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
          .finally(() => widget.toggleLoading());
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
