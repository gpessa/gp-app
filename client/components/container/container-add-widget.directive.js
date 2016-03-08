'use strict';

angular
  .module('gpAppApp')
  .directive('widgetContainerAddWidget', (WidgetService) => {
    return {
      'templateUrl' : 'components/container/container-add-widget.html',
      'restrict' : 'E',
      'replace' : true,
      'require' : '^widgetContainer',
      'link' : function (scope, element, attrs, widgetContainer) {
        scope.availablewidgets = [{
                'name' : 'Todo List',
                'type' : 'todo-list',
                'icon' : 'fa fa-list'
              },{
                'name' : 'Cigarette',
                'type' : 'cigarette',
                'icon' : 'icon icon-cigarette'
              },{
                'name' : 'Withings',
                'type' : 'withings',
                'icon' : 'fa fa-line-chart'
              },{
                'name' : 'Buienradar',
                'type' : 'buienradar',
                'icon' : 'fa fa-sun-o'
              },{
                'name' : 'Stocks',
                'type' : 'stock',
                'icon' : 'fa fa-university'
              },{
                'name' : 'Portfolio',
                'type' : 'portfolio',
                'icon' : 'fa fa-exchange'
              },{
                'name' : 'Balance',
                'type' : 'balance',
                'icon' : 'fa fa-line-chart'
              },{
                'name' : 'Positive Thing',
                'type' : 'positive-thing',
                'icon' : 'fa fa-plus'
              },{
                'name' : 'Forecast',
                'type' : 'forecast',
                'icon' : 'fa fa-sun-o'
              }];

        scope.addWidget = function(widget){
          WidgetService.create(widget, function(widget){
            widgetContainer.addWidget(widget);
          });
        };
      }
    };
  });
