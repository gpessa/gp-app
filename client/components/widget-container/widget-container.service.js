'use strict';

angular.module('gpAppApp')
  .service('widgetContainerService', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
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
          deferred.reject();
        })

        return deferred.promise;
    },
    create : function(id, callback){
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/api/widget-container/', {
          "_id" : id
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

        $http.put('/api/widget-container/' + widgetContainer._id, widgetContainer)
             .success(function(data) {
                deferred.resolve(data);
                return cb(data);
             });

        return deferred.promise;
    },
    remove  : function(widgetContainer, callback){
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.delete('/api/widget-container/' + widgetContainer._id, widgetContainer)
             .success(function(data) {
                deferred.resolve(data);
                return cb(data);
             });

        return deferred.promise;
    } 
  };
});

