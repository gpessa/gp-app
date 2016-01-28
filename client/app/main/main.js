'use strict';

angular.module('gpAppApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        authenticate: true
      });
  });
