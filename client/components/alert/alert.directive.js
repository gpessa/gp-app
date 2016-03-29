'use strict';

angular
  .module('gpAppApp')
  .directive('alert', function () {
    return {
      'templateUrl': 'components/alert/alert.html',
      'restrict': 'E',
      'replace' : true,
      'transclude': true,
      'scope' : {
        'type' : '@'
      },
      'link' : function(scope, element){
        element.find('a').addClass('alert-link');
      }
    };
  });
