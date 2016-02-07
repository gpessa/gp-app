'use strict';

(function() {

  function WidgetService($location, $rootScope, $http, User, $cookieStore, $q) {
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
        },
        update  : function(widget, callback){
          var cb = callback || angular.noop;
          var deferred = $q.defer();

          $http.put('/api/widget/' + widget._id, widget)
               .success(function(data) {
                  deferred.resolve(data);
                  return cb(data);
               });

          return deferred.promise;
        }
      };
  }

  angular.module('gpAppApp')
         .service('WidgetService', WidgetService);

})();
