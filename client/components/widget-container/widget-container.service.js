'use strict';

(function() {

  function WidgetContainerService($http, $q) {
    return {
      show : function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/widget-container/' + id).
        success(function(data) {
          deferred.resolve(data);
          return cb(data);
        }).
        catch(function(){
          $http.post('/api/widget-container/', {
            'id' : id
          }).
          success(function(data) {
            deferred.resolve(data);
            return cb(data);
          });
        });

        return deferred.promise;
      },
      create : function(id, callback){
          var cb = callback || angular.noop;
          var deferred = $q.defer();

          $http.post('/api/widget-container/', {
            'id' : id
          }).
          success(function(data) {
            deferred.resolve(data);
            return cb(data);
          });

          return deferred.promise;
      },
      update  : function(widgetContainer, callback){
          var cb = callback || angular.noop;
          var deferred = $q.defer();

          $http.put('/api/widget-container/' + widgetContainer.id, widgetContainer)
               .success(function(data) {
                  deferred.resolve(data);
                  return cb(data);
               });

          return deferred.promise;
      },
      remove  : function(widgetContainer, callback){
          var cb = callback || angular.noop;
          var deferred = $q.defer();

          $http.delete('/api/widget-container/' + widgetContainer.id, widgetContainer)
               .success(function(data) {
                  deferred.resolve(data);
                  return cb(data);
               });

          return deferred.promise;
      }
    };
  }

  angular.module('gpAppApp')
         .service('WidgetContainerService', WidgetContainerService);

})();
