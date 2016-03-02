'use strict';

angular.module('gpAppApp')
  .service('balanceService', function Auth($http, $q) {
    return {
      get : function() {
        var deferred = $q.defer();

        $http.get('/api/balances').
        success(function(data) {
          deferred.resolve(data);
        }).
        error(err => {
          deferred.reject(err);
        });

        return deferred.promise;
    },
    create : function(){
        var deferred = $q.defer();

        $http.post('/api/balances/', {}).
        success(function(data) {
          deferred.resolve(data);
        });

        return deferred.promise;
    },
    update  : function(balance){
        var deferred = $q.defer();

        $http.put('/api/balances/' + balance._id, balance)
             .success(function(data) {
                deferred.resolve(data);
             });

        return deferred.promise;
    },
    remove  : function(balance){
        var deferred = $q.defer();

        $http.delete('/api/balances/' + balance._id, balance)
             .success(function(data) {
                deferred.resolve(data);
             });

        return deferred.promise;
    }
  };
});
