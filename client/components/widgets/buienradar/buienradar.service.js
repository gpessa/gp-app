'use strict';
angular.module('gpAppApp').service('buienradarService', function($location, $rootScope, $http, User, $cookieStore, $q) {
    return {
        get: function(coordinates, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();
            $http.post('/api/buienradar', {
                params: coordinates
            }).
            success(function(data) {
                deferred.resolve(data);
                return cb(data);
            });
            return deferred.promise;
        }
    };
});