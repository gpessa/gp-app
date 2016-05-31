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

        var calculateColumnsWidth = () => {
          var columns = scope.item.model.children.length;
          var dim = parseInt(12 / columns);
          var dimLast = 12 - (columns * dim);

          angular.forEach(scope.item.model.children, function(child){
            child.attributes = child.attributes ? child.attributes : {};
            return child.attributes.dimension = dim;
          });

          if(dimLast){
            scope.item.model.children[columns - 1].attributes.dimension = dimLast;
          }

          console.log('=========');
          angular.forEach(scope.item.model.children, function(child, i){
            console.log('COL' + ' ' + i + ' ' + child.attributes.dimension);
          });
        };

        scope.addColumn = () => {
          scope.item.model.children.push(basicContainer);
          calculateColumnsWidth();
          item.save();
        };

        scope.removeColumn = (column) => {
          console.log('removed column');
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
