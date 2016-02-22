'use strict';

angular.module('gpAppApp')
  .service('stockService', function Auth($http, $q) {
    return {
      get : function(callback) {
          var cb = callback || angular.noop;
          var deferred = $q.defer();

          $http.get('/api/stock').
          success(function(data) {
            deferred.resolve(data);
            return cb();
          });

          return deferred.promise;
      },
      create : function(stock, callback){
          var cb = callback || angular.noop;
          var deferred = $q.defer();

          $http.post('/api/stock', stock)
               .success(function(data) {
                  deferred.resolve(data);
                  return cb();
                });

          return deferred.promise;
      },
      update  : function(stock, callback){
          var cb = callback || angular.noop;
          var deferred = $q.defer();

          $http.put('/api/stock/' + stock._id, stock)
               .success(function(data) {
                  deferred.resolve(data);
                  return cb();
               });

          return deferred.promise;
      },
      remove  : function(stock, callback){
          var cb = callback || angular.noop;
          var deferred = $q.defer();

          $http.delete('/api/stock/' + stock._id, stock)
               .success(function(data) {
                  deferred.resolve(data);
                  return cb();
               });

          return deferred.promise;
      }
  };
});
