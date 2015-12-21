'use strict';

angular.module('gpAppApp')
  .service('cigaretteService', function($location, $rootScope, $http, User, $cookieStore, $q) {
    return {
          get : function(callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            $http.get('/api/cigarette').
            success(function(data) {
              deferred.resolve(data);
              return cb();
            });

            return deferred.promise;
        },
        create : function(callback){
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            $http.post('/api/cigarette/', {
              
            }).
            success(function(data) {
              deferred.resolve(data);
              return cb();
            });

            return deferred.promise;
        },
        update  : function(list, callback){
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            $http.put('/api/cigarette/' + list._id, list)
                 .success(function(data) {
                    deferred.resolve(data);
                    return cb();
                 });

            return deferred.promise;
        },
        remove  : function(list, callback){
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            $http.delete('/api/cigarette/' + list._id, list)
                 .success(function(data) {
                    deferred.resolve(data);
                    return cb();
                 });

            return deferred.promise;
        } 
  };
});
