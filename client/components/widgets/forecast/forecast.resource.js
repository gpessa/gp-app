'use strict';

(function() {

  function ForecastResource($resource) {
    return $resource('/api/forecast', {}, {
      get: {
        method: 'POST'
      }
    });
  }

  angular.module('gpAppApp')
         .factory('ForecastResource', ForecastResource);

})();
