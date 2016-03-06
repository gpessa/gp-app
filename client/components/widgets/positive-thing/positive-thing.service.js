'use strict';

angular.module('gpAppApp')
  .service('positiveThingService', function Auth($http, $q) {
    return {
      get : function() {
        var deferred = $q.defer();

        $http.get('/api/positive-things').
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

        $http.post('/api/positive-things/', {}).
        success(function(data) {
          deferred.resolve(data);
        });

        return deferred.promise;
    },
    update  : function(positiveThings){
        var deferred = $q.defer();

        $http.put('/api/positive-things/' + positiveThings._id, positiveThings)
             .success(function(data) {
                deferred.resolve(data);
             });

        return deferred.promise;
    },
    remove  : function(positiveThings){
        var deferred = $q.defer();

        $http.delete('/api/positive-things/' + positiveThings._id, positiveThings)
             .success(function(data) {
                deferred.resolve(data);
             });

        return deferred.promise;
    }
  };
});
