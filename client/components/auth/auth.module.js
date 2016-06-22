'use strict';

angular.module('gpAppApp.auth', [
  'gpAppApp.constants',
  'gpAppApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
