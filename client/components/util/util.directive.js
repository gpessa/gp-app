'use strict';

angular.module('gpAppApp').directive('value', ($filter) => {

  return {
    'template' : '<span ng-class="cls">{{value}}</span>',
    'restrict' : 'EC',
    'replace' : true,
    'scope' : {
        ngModel : '=',
        isPositive : '=',
        filter : '@'
    },
    'link' : function(scope){

      scope.$watch('ngModel', function(value){
        if(value){
          if(!angular.isUndefined(scope.isPositive)){
            scope.cls = scope.isPositive ? 'text-success' : 'text-danger';
          } else {
            scope.cls = (value > 0) ? 'text-success' : 'text-danger';
          }

          switch(scope.filter) {
              case 'currency':
                scope.value = $filter('currency')(value);
                break;

              case 'percentage':
                scope.value = $filter('number')(value * 100, 2) + ' %';
                break;

              default:
                scope.value = value;
          }
        }
      })
    }
  };
});
