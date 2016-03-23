'use strict';

(function () {

  function PagesResource($resource) {
    return $resource('/api/pages/:id', { 'id': '@_id' }, {
      save: {
        method: 'PUT'
      },
      create: {
        method: 'POST'
      }
    });
  }

  angular
    .module('gpAppApp')
    .factory('PagesResource', PagesResource);
})();
