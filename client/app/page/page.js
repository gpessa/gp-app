'use strict';

angular
  .module('gpAppApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/page/:name', {
        templateUrl: 'app/page/page.html',
        controller: 'PageController',
        controllerAs: '$ctrl',
        authenticate: true
      });
  });
