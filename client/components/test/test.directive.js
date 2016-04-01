'use strict';

angular.module('gpAppApp')
  .directive('test', function () {
    return {
      templateUrl: 'components/test/test.html',
      restrict: 'EA',
      link: function () {
      }
    };
  });
