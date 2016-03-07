'use strict';

angular.module('gpAppApp')
  .service('todoListService', ($http, $q) => {
    return {
      get : function() {
          var deferred = $q.defer();

          $http
            .get('/api/todo-list')
            .success(data => {
              deferred.resolve(data);
            });

          return deferred.promise;
      },
      create : function(){
          var deferred = $q.defer();

          $http
            .post('/api/todo-list/')
            .success(data => {
              deferred.resolve(data);
            });

          return deferred.promise;
      },
      update : function(list){
          var deferred = $q.defer();

          $http
            .put('/api/todo-list/' + list._id, list)
            .success(data => {
              deferred.resolve(data);
            });

          return deferred.promise;
      },
      remove : function(list){
          var deferred = $q.defer();

          $http
            .delete('/api/todo-list/' + list._id, list)
            .success(data => {
              deferred.resolve(data);
            });

          return deferred.promise;
      }
  };
});
