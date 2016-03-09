'use strict';

angular
  .module('gpAppApp')
  .directive('containerAddWidget', (WidgetService) => {
    return {
      'templateUrl' : 'components/container/container-add-widget.html',
      'restrict' : 'E',
      'replace' : true,
      'require' : '^container',
      'link' : function (scope, element, attrs, container) {
        scope.availablewidgets = [{
          'element' : 'widget',
          'type' : 'todo-list',
          'name' : 'Todo List',
          'icon' : 'fa fa-list'
        },{
          'element' : 'widget',
          'type' : 'cigarette',
          'name' : 'Cigarette',
          'icon' : 'icon icon-cigarette'
        },{
          'element' : 'widget',
          'type' : 'withings',
          'name' : 'Withings',
          'icon' : 'fa fa-line-chart'
        },{
          'element' : 'widget',
          'type' : 'buienradar',
          'name' : 'Buienradar',
          'icon' : 'fa fa-sun-o'
        },{
          'element' : 'widget',
          'type' : 'stock',
          'name' : 'Stocks',
          'icon' : 'fa fa-university'
        },{
          'element' : 'widget',
          'type' : 'portfolio',
          'name' : 'Portfolio',
          'icon' : 'fa fa-exchange'
        },{
          'element' : 'widget',
          'type' : 'balance',
          'name' : 'Balance',
          'icon' : 'fa fa-line-chart'
        },{
          'element' : 'widget',
          'type' : 'positive-thing',
          'name' : 'Positive Thing',
          'icon' : 'fa fa-plus'
        },{
          'element' : 'widget',
          'type' : 'forecast',
          'name' : 'Forecast',
          'icon' : 'fa fa-sun-o'
        },{
          'element' : 'widget',
          'type' : 'container',
          'name' : 'Container',
          'icon' : 'fa fa-sun-o'
        },{
          'element' : 'container',
          'type' : 'container',
          'name' : 'Container',
          'icon' : ''
        }];

        scope.addWidget = function(widget){
          WidgetService.create(widget, function(widget){
            container.addWidget(widget);
          });
        };
      }
    };
  });
