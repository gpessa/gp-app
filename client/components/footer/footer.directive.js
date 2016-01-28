'use strict';

angular.module('gpAppApp')
  .directive('footer', function () {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
      replace : true,
      link: function (scope, element) {
        element.addClass('footer');
      }
    };
  });
