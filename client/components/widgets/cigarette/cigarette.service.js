'use strict';

(function() {

  class cigaretteService {

    constructor($q, $http){
      this.url = '/api/cigarette';
      this.$http = $http;
      this.$q = $q;
    }

    get() {
      let deferred = this.$q.defer();
      this.$http
        .get(this.url)
        .success(data => {
          deferred.resolve(data);
        })
        .error(err => {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    create(){
      let deferred = this.$q.defer();
      this.$http
        .post('/api/cigarette/')
        .success((data) => {
          deferred.resolve(data);
        });

      return deferred.promise;
    }
  }

  angular.module('gpAppApp')
         .service('cigaretteService', cigaretteService);

})();
