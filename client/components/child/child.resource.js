'use strict';

(function() {

  function ChildResource($resource) {
    return $resource('/api/childs/:id', {'id' : '@_id'}, {
      save: {
        method: 'PUT'
      },
      create: {
        method: 'POST'
      }
    });
  }

  angular.module('gpAppApp')
         .factory('ChildResource', ChildResource);

})();
