'use strict';

angular.module('gpAppApp')
  .directive('error', function () {
    return {
      templateUrl: 'components/error/error.html',
      restrict: 'E',
      replace : true,
      transclude: true,
      link:function(scope, element){
        element.find('a').addClass('alert-link');
      }
    };
  });
