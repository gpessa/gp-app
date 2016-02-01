'use strict';

angular.module('gpAppApp.auth', [
  'gpAppApp.constants',
  'gpAppApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
