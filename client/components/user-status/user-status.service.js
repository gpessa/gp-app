'use strict';

angular.module('gpAppApp')
  .service('userStatus', function ($window) {
    return $window.ifvisible;
  });
