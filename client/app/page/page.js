'use strict';

angular
  .module('gpAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('page', {
        url: '/page/:name',
        templateUrl: 'app/page/page.html',
        controller: 'PageController',
        controllerAs: '$ctrl',
        authenticate: true
      });
  });
