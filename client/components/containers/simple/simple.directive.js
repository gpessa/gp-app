'use strict';

angular
  .module('gpAppApp')
  .directive('containerSimple', (editMode) => {
    return {
      'templateUrl' : 'components/containers/simple/simple.html',
      'require' : '^^item',
      'restrict' : 'C',
      'replace' : true,
      'link' : {
        post : function(scope, element, attr, item){
          scope.item = item;
          scope.editMode = editMode;

          scope.sortableOption = {
            'allow_cross' : true,
            'handle' : '.handle',
            'stop' : function(list, dropped_index, extra_data, drag_extra_data){
              if(drag_extra_data){
                drag_extra_data.children.remove(list[dropped_index]);
                drag_extra_data.$save();
              }
              scope.item.model.$save();
            }
          };
        }
      }

    };
  });
