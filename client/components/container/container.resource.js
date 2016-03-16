'use strict';

(function() {

  function ContainerResource($resource) {
    return $resource('/api/container/:id', {'id' : '@_id'}, {
      save: {
        method: 'PUT'
      },
      create: {
        method: 'POST'
      }
    });
  }

  angular.module('gpAppApp')
         .factory('ContainerResource', ContainerResource);

})();
