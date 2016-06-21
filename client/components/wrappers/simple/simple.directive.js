'use strict';

angular
  .module('gpAppApp')
  .directive('wrapperSimple', (editMode) => {
    return {
      'templateUrl' : 'components/wrappers/simple/simple.html',
      'require' : '^^item',
      'restrict' : 'C',
      'link' : {
        post : function(scope, element, attr, item){
          scope.item = item;
          scope.editMode = editMode;

          scope.added = function(event, index, item){
            scope.item.save();
            return item;
          }

          scope.removed = function(event, item, index){
            scope.item.model.children.splice(index, 1);
            scope.item.save();
          }

        }
      }

    };
  });
