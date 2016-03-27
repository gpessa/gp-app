'use strict';

angular
  .module('gpAppApp')
  .directive('addChild', function (editMode) {
    return {
      'templateUrl' : 'components/add-child/add-child.html',
      'restrict' : 'EA',
      'replace' : true,
      'scope'  : true,
      'link' : function (scope, element, attrs) {
        scope.editMode = editMode;

        scope.sortableOption = {
          'stop' : () => {
          }
        };

        scope.availablechildren = {
          'Widget' : [{
              'icon' : 'fa fa-list',
              'type' : 'todo-list',
              'name' : 'Todo List'
            },{
              'icon' : 'icon icon-cigarette',
              'type' : 'cigarette',
              'name' : 'Cigarette'
            },{
              'icon' : 'fa fa-line-chart',
              'type' : 'withings',
              'name' : 'Withings'
            },{
              'icon' : 'fa fa-sun-o',
              'type' : 'buienradar',
              'name' : 'Buienradar'
            },{
              'icon' : 'fa fa-university',
              'type' : 'stock',
              'name' : 'Stocks'
            },{
              'icon' : 'fa fa-exchange',
              'type' : 'portfolio',
              'name' : 'Portfolio'
            },{
              'icon' : 'fa fa-line-chart',
              'type' : 'balance',
              'name' : 'Balance'
            },{
              'icon' : 'fa fa-plus',
              'type' : 'positive-thing',
              'name' : 'Positive Thing'
            },{
              'icon' : 'fa fa-sun-o',
              'type' : 'forecast',
              'name' : 'Forecast'
          }],
          'Container' : [{
              'icon' : 'fa fa-square-o',
              'type' : 'basic',
              'name' : 'Basic'
          }]
        };
      }
    };
  });
