'use strict';


(function() {

  function CigaretteService($http, $q) {
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
    }
  };

  angular.module('gpAppApp')
         .service('CigaretteService', CigaretteService);

})();
