'use strict';
angular
  .module('gpAppApp')
  .directive('wrapperColumns', ($filter, editMode, availableItems) => {
    return {
      'templateUrl': 'components/wrappers/columns/columns.html',
      'require': '^^item',
      'restrict': 'C',
      'replace': true,
      'link': function(scope, element, attr, item) {
        scope.item = item;
        scope.editMode = editMode;
        var basicWrapper = $filter('filter')(availableItems.Wrapper, { 'subtype': 'simple' })[0];

        var calculateColumnsWidth = () => {
          var dim = parseInt(12 / scope.item.model.children.length);
          scope.item.model.children = scope.item.model.children.map((child) => {
            child.attributes = child.attributes ? child.attributes : {};
            child.attributes.dimension = dim;
            return child;
          });
        };

        scope.addColumn = () => {
          scope.item.model.children = scope.item.model.children ? scope.item.model.children : [];
          scope.item.model.children.push(angular.copy(basicWrapper));
          calculateColumnsWidth();
          item.save();
        };

        scope.removeColumn = (column) => {
          scope.item.model.children.remove(column);
          calculateColumnsWidth();
          item.save();
        };

        if (scope.item.model._id && scope.item.model.children.length === 0) {
          scope.addColumn();
        }
      }
    };
  });
