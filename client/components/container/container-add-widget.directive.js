'use strict';

angular
  .module('gpAppApp')
  .directive('containerAddWidget', (WidgetService, ContainerService) => {
    return {
      'templateUrl' : 'components/container/container-add-widget.html',
      'restrict' : 'E',
      'replace' : true,
      'require' : '^container',
      'link' : function (scope, element, attrs, container) {
        scope.availablechildrentypes = {
            'Container' : [{
                'icon' : 'fa fa-square-o',
                'type' : 'basic',
                'name' : 'Container'
            }],
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
            }]
        }

        scope.addChild = (child, type) => {
          switch (type) {
            case 'Widget':
              WidgetService.create(child).then(widget => {
                container.linkChild(widget);
              });
              break;
            case 'Widget':
              ContainerService.create(child).then(container => {
                container.linkChild(container);
              });

          }
        };
      }
    };
  });
