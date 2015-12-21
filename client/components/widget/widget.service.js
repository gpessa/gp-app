'use strict';

angular.module('gpAppApp')
  .service('widgetService', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    return {
      create : function(widget, callback){
          var cb = callback || angular.noop;
          var deferred = $q.defer();

          $http.post('/api/widget/', widget).
          success(function(data) {
            deferred.resolve(data);
            return cb(data);
          });

          return deferred.promise;
      },
      remove  : function(widget, callback){
          var cb = callback || angular.noop;
          var deferred = $q.defer();

          $http.delete('/api/widget/' + widget._id)
               .success(function(data) {
                  deferred.resolve(data);
                  return cb(data);
               });

          return deferred.promise;
      } 
  };
});

