'use strict';

(function() {

  function ContainerService($http, $q) {
    return {
      show : function(id) {
        var deferred = $q.defer();

        $http
          .get('/api/container/' + id)
          .success(function(data) {
            deferred.resolve(data);
          })
          .catch(function(){
            $http
              .post('/api/container/', {'id' : id})
              .success(function(data) {
                deferred.resolve(data);
              });
          });

        return deferred.promise;
      },
      create : function(id){
          var deferred = $q.defer();

          $http
            .post('/api/container/', {
              'id' : id
            })
            .success(function(data) {
              deferred.resolve(data);
            });

          return deferred.promise;
      },
      update  : function(widgetContainer){
          var deferred = $q.defer();

          $http
            .put('/api/container/' + widgetContainer.id, widgetContainer)
            .success(function(data) {
              deferred.resolve(data);
            });

          return deferred.promise;
      },
      remove  : function(widgetContainer){
          var deferred = $q.defer();

          $http
            .delete('/api/container/' + widgetContainer.id, widgetContainer)
            .success(function(data) {
              deferred.resolve(data);
            });

          return deferred.promise;
      }
    };
  }

  angular.module('gpAppApp')
         .service('ContainerService', ContainerService);

})();
