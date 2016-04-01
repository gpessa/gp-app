'use strict';

(function() {

  function WithingsResource($resource) {
    return $resource('/api/withings/:id', {}, {
      'get' : {
        'cache' : true
      }
    });
  }

  angular
    .module('gpAppApp')
    .factory('WithingsResource', WithingsResource);

})();
