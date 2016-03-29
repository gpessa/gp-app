'use strict';

(function() {

  function ItemResource($resource) {
    return $resource('/api/items/:id', {'id' : '@_id'}, {
      save: {
        method: 'PUT'
      },
      create: {
        method: 'POST'
      }
    });
  }

  angular.module('gpAppApp')
         .factory('ItemResource', ItemResource);

})();
