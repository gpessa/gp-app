'use strict';

(function() {

  function Withings($q, $http) {
    // var response;

    return {
      getData: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/withings', {
                cache : true
              })
              .success(function(data) {
                // response = data;
                deferred.resolve(data);
                return cb();
              })
              .error(function(err) {
                return cb(err);
              }.bind(this));

              return deferred.promise;
      }
    };

  }

  angular.module('gpAppApp')
    .service('Withings', Withings);

})();

