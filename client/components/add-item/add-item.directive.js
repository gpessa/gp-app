'use strict';

angular
  .module('gpAppApp')
  .directive('addItem', function(editMode) {
    return {
      'templateUrl': 'components/add-item/add-item.html',
      'restrict': 'EA',
      'replace': true,
      'scope': true,
      'link': function(scope, element, attrs) {
        scope.editMode = editMode;

        scope.sortableOption = {
          'allow_cross': true
        };

        scope.availableItems = {
          'Widget': [{
            'icon': 'fa fa-list',
            'type': 'widget',
            'subtype': 'todo-list',
            'attributes': {
              'name': 'Todo List'
            }
          }, {
            'icon': 'icon icon-cigarette',
            'type': 'widget',
            'subtype': 'cigarette',
            'attributes': {
              'name': 'Cigarette'
            }
          }, {
            'icon': 'fa fa-line-chart',
            'type': 'widget',
            'subtype': 'withings',
            'attributes': {
              'name': 'Withings'
            }
          }, {
            'icon': 'fa fa-sun-o',
            'type': 'widget',
            'subtype': 'buienradar',
            'attributes': {
              'name': 'Buienradar'
            }
          }, {
            'icon': 'fa fa-university',
            'type': 'widget',
            'subtype': 'stock',
            'attributes': {
              'name': 'Stocks'
            }
          }, {
            'icon': 'fa fa-exchange',
            'type': 'widget',
            'subtype': 'portfolio',
            'attributes': {
              'name': 'Portfolio'
            }
          }, {
            'icon': 'fa fa-line-chart',
            'type': 'widget',
            'subtype': 'balance',
            'attributes': {
              'name': 'Balance'
            }
          }, {
            'icon': 'fa fa-plus',
            'type': 'widget',
            'subtype': 'positive-thing',
            'attributes': {
              'name': 'Positive Thing'
            }
          }, {
            'icon': 'fa fa-sun-o',
            'type': 'widget',
            'subtype': 'forecast',
            'attributes': {
              'name': 'Forecast'
            }
          }],
          'Container': [{
            'icon': 'fa fa-square-o',
            'type': 'container',
            'subtype': 'basic',
            'attributes': {
              'name': 'Basic'
            }
          }]
        };
      }
    };
  });