'use strict';

(function() {

  function BuienradarResource($resource) {
    return $resource('/api/buienradar', {}, {
      get: {
        method: 'GET'
      }
    });
  }

  angular.module('gpAppApp')
         .factory('BuienradarResource', BuienradarResource);

})();
