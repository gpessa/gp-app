'use strict';

angular.module('gpAppApp')
  .service('stockService', function Auth($http, $q) {
    return {
      get : function() {
          var deferred = $q.defer();

          $http.get('/api/stock').
          success(function(data) {
            deferred.resolve(data);
          }).
          error(err => {
            deferred.reject(err);
          });

          return deferred.promise;
      },
      create : function(stock){
          var deferred = $q.defer();

          $http.post('/api/stock', stock)
               .success(function(data) {
                  deferred.resolve(data);
                });

          return deferred.promise;
      },
      update  : function(stock){
          var deferred = $q.defer();

          $http.put('/api/stock/' + stock._id, stock)
               .success(function(data) {
                  deferred.resolve(data);
               });

          return deferred.promise;
      },
      remove  : function(stock){
          var deferred = $q.defer();

          $http.delete('/api/stock/' + stock._id, stock)
               .success(function(data) {
                  deferred.resolve(data);
               });

          return deferred.promise;
      }
  };
});
