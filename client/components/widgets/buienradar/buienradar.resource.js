'use strict';

(function() {

  function BuienradarResource($resource) {
    return $resource('/api/buienradar/latitude/:latitude/longitude/:longitude', {
      latitude : '@latitude',
      longitude : '@longitude'
    });
  }

  angular.module('gpAppApp')
         .factory('BuienradarResource', BuienradarResource);

})();
