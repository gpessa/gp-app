'use strict';

(function() {

  function TodoListResource($resource) {
    return $resource('/api/todo-list/:id', {
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
    .factory('TodoListResource', TodoListResource);

})();
