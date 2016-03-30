'use strict';

angular.module('gpAppApp')
  .config(function ($provide) {
    $provide.decorator('test', function ($delegate) {
      // decorate the $delegate
      return $delegate;
    });
  });
