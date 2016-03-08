'use strict';

(function() {

  class forecastService {

    constructor($q, $http){
      this.url = '/api/forecast';
      this.$http = $http;
      this.$q = $q;
    }

    get(coordinates) {
      let deferred = this.$q.defer();
      this.$http
        .post(this.url, {
          'params' : coordinates
        })
        .success(data => {
          deferred.resolve(data);
        })
        .catch(err => {
          deferred.reject(err);
        });

      return deferred.promise;
    }
  }

  angular.module('gpAppApp')
         .service('forecastService', forecastService);

})();
