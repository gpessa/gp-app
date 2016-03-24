'use strict';

angular
  .module('gpAppApp')
  .directive('editMode', function (editMode) {
    return {
      'template' : '<a href="" ng-transclude ng-click="toggle()"></a>',
      'transclude' : true,
      'restrict' : 'CAE',
      'replace' : true,
      'scope' : true,
      'link' : function(scope, attrs, element){
        scope.toggle = function(){
          editMode.toggle();
        }
      }
    };
  });
