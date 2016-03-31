'use strict';

(function() {

  function CigaretteResource($resource) {
    return $resource('/api/cigarette/:id', {'id' : '@_id'}, {
      smoke : {
        method: 'PUT'
      },
      create: {
        method: 'POST'
      }
    });
  }

  angular.module('gpAppApp')
         .factory('CigaretteResource', CigaretteResource);

})();
