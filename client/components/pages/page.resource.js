'use strict';

(function () {

  function PagesResource($resource) {
    return $resource('/api/pages/:id', { 'id': '@_id' }, {
      save: {
        method: 'PUT'
      }
    });
  }

  angular
    .module('gpAppApp')
    .factory('PagesResource', PagesResource);
})();
