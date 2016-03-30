'use strict';

angular.module('gpAppApp').directive('container', (editMode) => {
  return {
    'templateUrl' : 'components/container/container.html',
    'require' : '^^item',
    'restrict' : 'E',
    'replace' : true,
    'link' : function(scope, element, attr, item){
      scope.item = item;
      scope.editMode = editMode;

      scope.sortableOption = {
        'allow_cross' : true,
        'stop' : (children, dropped_index) => {
          // debugger;
          scope.item.save();
        }
      };
    }
  };
});
