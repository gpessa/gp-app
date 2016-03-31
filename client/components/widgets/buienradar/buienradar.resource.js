'use strict';

(function() {

  function BuienradarResource($resource) {
    return $resource('/api/buienradar', {}, {
      get: {
        method: 'POST'
      }
    });
  }

  angular.module('gpAppApp')
         .factory('BuienradarResource', BuienradarResource);

})();
