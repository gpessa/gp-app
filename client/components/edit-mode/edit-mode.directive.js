'use strict';

angular
  .module('gpAppApp')
  .directive('editMode', function (editMode) {
    return {
      'restrict' : 'A',
      'scope' : true,
      'link' : function(scope, element){
        angular.element(element).click(()=>{
          scope.$apply(editMode.toggle());
        })
      }
    };
  });
