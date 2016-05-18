'use strict';

(function() {

  function WithingsResource($resource) {
    return $resource('/api/withings/limit/:limit', {'limit' : '@limit'}, {
      'get' : {
        'cache' : true
      }
    });
  }

  angular
    .module('gpAppApp')
    .factory('WithingsResource', WithingsResource);

})();
