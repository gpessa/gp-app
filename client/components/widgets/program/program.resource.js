'use strict';

(function() {

  function ProgramResource($resource) {
    return $resource('/api/program/:id', {
      'id': '@_id'
    }, {
      'get': { 'method': 'POST' },
      'update': { 'method': 'PUT' }
    });
  }

  angular.module('gpAppApp')
         .factory('ProgramResource', ProgramResource);

})();
