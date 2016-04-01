'use strict';

(function() {

  function WithingsResource($resource) {
    return $resource('/api/withings/:id');
  }

  angular
    .module('gpAppApp')
    .factory('WithingsResource', WithingsResource);

})();
