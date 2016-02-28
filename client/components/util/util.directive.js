'use strict';

angular.module('gpAppApp').directive('val', ($filter) => {
  return {
    'template' : '<span>{{value}} <i class="dot" ng-class="cls"></i></span>',
    'restrict' : 'A',
    'scope' : {
        val : '=',
        isPositive : '=',
        filter : '@'
    },
    'link' : function(scope){

      scope.$watch('val', function(value){
        if(value){
          if(!angular.isUndefined(scope.isPositive)){
            scope.cls = scope.isPositive ? 'dot-success' : 'dot-danger';
          } else {
            scope.cls = (value > 0) ? 'dot-success' : 'dot-danger';
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

angular.module('gpAppApp').directive('subMenuBtn', ($filter) => {
  return {
    'template' : '<span click-outside="close()" class="sub-menu-btn">\
                    <a class="btn btn-link-light" ng-click="toggle();$event.stopPropagation();">\
                      <i class="fa fa-ellipsis-h"></i>\
                    </a>\
                    <span ng-transclude ng-show="isOpen" ng-click="close()"></span>\
                  </span>',
    'restrict' : 'E',
    'transclude' : true,
    'replace' : true,
    'link' : function(scope, element, attr){
      scope.open = function(){
        scope.isOpen = true;
      }
      scope.close = function(){
        scope.isOpen = false;
      }
      scope.toggle = function(){
        scope.isOpen = !scope.isOpen;
      }
    }
  };
});
