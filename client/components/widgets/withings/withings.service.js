'use strict';

(function() {

  class Withings {
    url = '/api/withings';

    constructor($q, $http){
      this.$http = $http;
      this.deferred = $q.defer();
    }

    getData() {
      this.$http.get(this.url, {'cache' : true})
                .success(data => {
                  this.deferred.resolve(data);
                })
                .error(err => {
                  this.deferred.reject(err);
                });

      return this.deferred.promise;
    }
  }

  angular.module('gpAppApp')
         .service('Withings', Withings);

})();
