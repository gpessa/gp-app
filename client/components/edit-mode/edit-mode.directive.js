'use strict';

angular
  .module('gpAppApp')
  .directive('editMode', function (editMode) {
    return {
      'template' : '<a href="" ng-transclude ng-click="toggle()"></a>',
      'transclude' : true,
      'restrict' : 'CAE',
      'scope' : true,
      'link' : function(scope){
        scope.toggle = function(){
          editMode.toggle();
        };
      }
    };
  });
