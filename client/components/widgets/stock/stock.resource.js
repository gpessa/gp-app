'use strict';

(function() {

  function StockResource($resource) {
    return $resource('/api/stock/:id', {'id' : '@_id'}, {
      save: {
        method: 'PUT'
      },
      create: {
        method: 'POST'
      }
    });
  }

  angular.module('gpAppApp')
         .factory('StockResource', StockResource);

})();
