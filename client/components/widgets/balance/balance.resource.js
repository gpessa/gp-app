'use strict';

(function() {

  function BalanceResource($resource) {
    return $resource('/api/balances/:id', {'id' : '@_id'}, {
      get : {
        responseType : 'json'
      },
      save: {
        responseType : 'json',
        method: 'PUT'
      }
    });
  }

  angular.module('gpAppApp')
         .factory('BalanceResource', BalanceResource);

})();
