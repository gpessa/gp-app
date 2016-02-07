'use strict';

angular.module('gpAppApp').directive('widgetContainerAddWidget', (WidgetService) => {
  return {
    'templateUrl' : 'components/widget-container/widget-container-add-widget.html',
    'restrict' : 'E',
    'replace' : true,
    'require' : '^widgetContainer',
    'link' : function (scope, element, attrs, widgetContainer) {
      scope.availablewidgets = [{
        'name' : 'Shopping List',
        'type' : 'shopping-list',
        'icon' : 'fa fa-shopping-cart'
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
      }];

      scope.addWidget = function(widget){
        WidgetService.create(widget, function(widget){
          widgetContainer.addWidget(widget);
        });
      };
    }
  };
});
