'use strict';

angular.module('gpAppApp')
  .service('portfolioService', function Auth($http, $q) {
    return {
      get : function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/portfolios').
        success(function(data) {
          deferred.resolve(data);
          return cb();
        }).
        error(err => {
          deferred.reject(err);
        });

        return deferred.promise;
    },
    create : function(callback){
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/api/portfolios/', {}).
        success(function(data) {
          deferred.resolve(data);
          return cb();
        });

        return deferred.promise;
    },
    update  : function(portfolio, callback){
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.put('/api/portfolios/' + portfolio._id, portfolio)
             .success(function(data) {
                deferred.resolve(data);
                return cb();
             });

        return deferred.promise;
    },
    remove  : function(portfolio, callback){
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.delete('/api/portfolios/' + portfolio._id, portfolio)
             .success(function(data) {
                deferred.resolve(data);
                return cb();
             });

        return deferred.promise;
    }
  };
});
