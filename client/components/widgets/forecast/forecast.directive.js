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

        scope.getIcon = (icon) => {
          return {
            'clear-day'           : 'wi wi-day-sunny',
            'clear-night'         : 'wi wi-night-clear',
            'snow'                : 'wi wi-snow',
            'partly-cloudy-day'   : 'wi wi-day-cloudy',
            'partly-cloudy-night' : 'wi wi-night-alt-cloudy',
            'rain'                : 'wi wi-rain',
            'cloudy'              : 'wi wi-cloudy'
          }[icon];
        };

        scope.get = (coordinates) => {
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

        scope.getData = () => {
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
