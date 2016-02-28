'use strict';

angular.module('gpAppApp')
  .filter('operation', function($filter) {
    return function(operation, operations) {
      return $filter('filter')(operations, { 'id' : operation})[0].label;
    };
});
