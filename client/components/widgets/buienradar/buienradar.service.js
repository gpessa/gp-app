'use strict';

(function() {

  class Buienradar {

    constructor($q, $http){
      this.url = '/api/buienradar';
      this.$http = $http;
      this.$q = $q;
    }

    get(coordinates) {
      let deferred = this.$q.defer();
      this.$http.post(this.url, {
        'cache' : true,
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
         .service('Buienradar', Buienradar);

})();
