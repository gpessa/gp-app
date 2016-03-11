'use strict';

(function() {

  function ContainerResource($resource) {
    return $resource('/api/container/:id', { id: '@_id'}, {
      update: {
        method: 'PUT'
      },
      createChild : {
        method: 'PUT',
        url : '/api/container/:id/create-child/type/:type',
        params:{ id: '@_id', type: '@_type' }
      }
    });
  }

  angular.module('gpAppApp')
         .factory('ContainerResource', ContainerResource);


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
              .success((data) => {
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
      update  : function(container){
          var deferred = $q.defer();

          $http
            .put('/api/container/' + container.id, container)
            .success(function(data) {
              deferred.resolve(data);
            });

          return deferred.promise;
      },
      remove  : function(container){
          var deferred = $q.defer();

          $http
            .delete('/api/container/' + container.id, container)
            .success(function(data) {
              deferred.resolve(data);
            });

          return deferred.promise;
      },
      removeChild : function(container, child){
          var deferred = $q.defer();

          $http
            .delete('/api/container/' + container.id + '/child/' + child._id)
            .success(function(data) {
              debugger;
              deferred.resolve(data);
            });

          return deferred.promise;
      }
    };
  }

  angular.module('gpAppApp')
         .service('ContainerService', ContainerService);

})();
