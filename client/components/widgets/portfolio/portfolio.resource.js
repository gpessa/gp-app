'use strict';

(function() {

  function PortfolioResource($resource) {
    return $resource('/api/portfolios/:id', {'id' : '@_id'}, {
      save: {
        method: 'PUT'
      },
      create: {
        method: 'POST'
      }
    });
  }

  angular.module('gpAppApp')
         .factory('PortfolioResource', PortfolioResource);

})();
