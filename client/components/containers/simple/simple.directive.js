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
