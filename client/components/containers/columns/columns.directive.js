'use strict';

angular
  .module('gpAppApp')
  .directive('containerColumns', (editMode) => {
    return {
      'templateUrl' : 'components/containers/columns/columns.html',
      'require' : '^^item',
      'restrict' : 'C',
      'replace' : true,
      'link' : function(scope, element, attr, item){
        scope.item = item;
        scope.editMode = editMode;

        scope.addColumn = function(){
          scope.item.model.children.push({
            'icon': 'fa fa-square-o',
            'type': 'container',
            'subtype': 'base',
            'attributes': {
              'name': 'Basic'
            }
          });
          item.save();
        }

        scope.deleteColumn = function(column){
          scope.item.model.children.remove(column);
          item.save();
        }
      }
    };
  });
