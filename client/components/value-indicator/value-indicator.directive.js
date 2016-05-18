'use strict';

angular
  .module('gpAppApp')
  .directive('valueIndicator', $filter => {
    return {
      'templateUrl' : 'components/value-indicator/value-indicator.html',
      'restrict' : 'E',
      'replace' : true,
      'scope' : {
        'value' : '=?',
        'isPositive' : '=?',
        'filter' : '@?'
      },
      'link' : function(scope) {
        scope.$watch('value', value => {
          if (value) {
            scope.cls = (scope.isPositive || value > 0) ? 'value-indicator-success' : 'value-indicator-danger';

            switch (scope.filter) {
              case 'currency':
                scope.v = $filter('currency')(value);
                break;

              case 'percentage':
                scope.v = $filter('number')(value * 100, 2) + ' %';
                break;

              default:
                scope.v = value;
            }
          }
        });
      }
    };
  });
