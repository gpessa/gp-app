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
        var basicContainer = $filter('filter')(availableItems.Container, { 'subtype' : 'simple'})[0];

        var calculateColumnsWidth = () => {
          var dim = parseInt(12 / scope.item.model.children.length);
          scope.item.model.children = scope.item.model.children.map((child) => {
            child.attributes = child.attributes ? child.attributes : {};
            child.attributes.dimension = dim;
            return child;
          });
        };

        scope.addColumn = () => {
          scope.item.model.children.push(angular.copy(basicContainer));
          calculateColumnsWidth();
          item.save();
        };

        scope.removeColumn = (column) => {
          scope.item.model.children.remove(column);
          calculateColumnsWidth();
          item.save();
        };

        if(!scope.item.model.children.length) {
          scope.addColumn();
        }

      }
    };
  });
