'use strict';

angular
  .module('gpAppApp')
  .directive('containerBase', (editMode) => {
    return {
      'templateUrl' : 'components/containers/base/base.html',
      'require' : '^^item',
      'restrict' : 'C',
      'replace' : true,
      'link' : function(scope, element, attr, item){
        scope.item = item;
        scope.editMode = editMode;

        scope.sortableOption = {
          'allow_cross' : true,
          'stop' : () => {
            scope.item.save();
          }
        };
      }
    };
  });
