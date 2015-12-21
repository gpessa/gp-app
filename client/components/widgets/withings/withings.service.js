'use strict';

angular.module('gpAppApp')
  .service('Withings', function ($q, $http) {
    return {
      getData: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/withings')
              .success(function(data) {
                deferred.resolve(data);
                return cb();
              })
              .error(function(err) {
                return cb(err);
              }.bind(this));

              return deferred.promise;
      }
    };

  });
