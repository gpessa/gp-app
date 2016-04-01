'use strict';

angular
  .module('gpAppApp')
  .directive('widgetForecast', ($geolocation, ForecastResource, userStatus, formats) => {
    return {
      'templateUrl' : 'components/widgets/forecast/forecast.html',
      'require' : '^^item',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function(scope, element, attr, item) {
        scope.formats = formats;

        scope.getIcon = function(icon){
          return {
            'clear-day'           : 'iw-sun-1',
            'clear-night'         : 'iw-moon-1',
            'snow'                : 'iw-snow',
            'partly-cloudy-day'   : 'iw-partly-cloudy-1',
            'partly-cloudy-night' : 'iw-partly-cloudy-3',
            'rain'                : 'iw-heavy-rain-1',
            'cloudy'              : 'iw-mostly-cloudy-2'
          }[icon];
        };

        scope.get = function(coordinates) {
          item.toggleLoading();

          scope.forecast = new ForecastResource({
            'lat' : coordinates.coords.latitude,
            'lon' : coordinates.coords.longitude
          });

          scope.forecast
            .$get()
            .catch(error => scope.error = error)
            .finally(() => item.toggleLoading());
        };

        scope.getData = function(){
          item.toggleLoading();

          $geolocation
            .getCurrentPosition()
            .then(scope.get)
            .catch(exception => scope.error = exception.error)
            .finally(() => item.toggleLoading());
        };


        userStatus.focus(scope.getData);
        scope.getData();
      }
    };
  });
