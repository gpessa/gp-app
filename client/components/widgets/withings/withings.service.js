'use strict';

(function() {

  class Withings {

    constructor($q, $http){
      this.url = '/api/withings';
      this.$http = $http;
      this.$q = $q;
    }

    get() {
      let deferred = this.$q.defer();
      this.$http.get(this.url, {'cache' : true})
        .success(data => {
          deferred.resolve(data);
        })
        .error(err => {
          deferred.reject(err);
        });

      return deferred.promise;
    }
  }

  angular.module('gpAppApp')
         .service('Withings', Withings);

})();
