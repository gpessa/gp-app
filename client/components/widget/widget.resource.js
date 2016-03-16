'use strict';

(function() {

  function WidgetResource($resource) {
    return $resource('/api/widget/:id', {'id' : '@_id'}, {
      save: {
        method: 'PUT'
      },
      create: {
        method: 'POST'
      }
    });
  }

  angular.module('gpAppApp')
         .factory('WidgetResource', WidgetResource);

})();
