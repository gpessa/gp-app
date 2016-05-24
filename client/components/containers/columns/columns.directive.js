'use strict';

angular
  .module('gpAppApp')
  .directive('containerColumns', ($filter, editMode, availableItems) => {
    return {
      'templateUrl' : 'components/containers/columns/columns.html',
      'require' : '^^item',
      'restrict' : 'C',
      'replace' : true,
      'link' : function(scope, element, attr, item){
        scope.item = item;
        scope.editMode = editMode;
        var basicContainer = $filter('filter')(availableItems.Container, { 'subtype' : 'base'})[0];

        scope.addColumn = function(){
          scope.item.model.children.push(basicContainer);
          item.save();
        }

        scope.removeColumn = function(column){
          scope.item.model.children.remove(column);
          item.save();
        }
      }
    };
  });
