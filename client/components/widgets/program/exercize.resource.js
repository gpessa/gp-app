'use strict';

(function() {

  function EcercizeResource($resource) {
    return $resource('/api/exercize/:id', {
      'id': '@_id'
    }, {
      'get': { 'method': 'POST' },
      'update': { 'method': 'PUT' }
    });
  }

  angular.module('gpAppApp')
         .factory('EcercizeResource', EcercizeResource);

})();
