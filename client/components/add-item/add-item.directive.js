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

        scope.sortableOption = {
          'allow_cross': true
        };

        scope.availableItems = availableItems;
      }
    };
  });
