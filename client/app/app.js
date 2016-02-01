'use strict';

angular.module('gpAppApp', [
  'gpAppApp.auth',
  'gpAppApp.admin',
  'gpAppApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngMessages',
  'btford.socket-io',
  'ui.bootstrap',
  'validation.match',
  'chart.js',
  'html5.sortable',
  'schemaForm'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
