'use strict';

(function() {

  function PositiveThingResource($resource) {
    return $resource('/api/positive-things/:id/limit/:limit', {
      'id': '@_id'
    }, {
      save: {
        method: 'PUT'
      },
      create: {
        method: 'POST'
      }
    });
  }

  angular.module('gpAppApp')
    .factory('PositiveThingResource', PositiveThingResource);

})();
