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

          scope.add = function(event, index, item, type, external){
            scope.item.model.children.push(item);
            scope.item.save();
            return true;
          }

          scope.remove = function(child){
            scope.item.model.children.remove(child);
            scope.item.save();
          }
        }
      }

    };
  });
