'use strict';

angular
  .module('gpAppApp')
  .directive('addItem', function(editMode, availableItems) {
    return {
      'templateUrl': 'components/add-item/add-item.html',
      'restrict': 'EA',
      'replace': true,
      'scope': true,
      'link': function(scope) {
        scope.editMode = editMode;
        scope.availableItems = availableItems;

        scope.$watch('availableItems.Widget', function(model) {
          scope.modelAsJson = angular.toJson(model, true);
        }, true);

      }
    };
  });
