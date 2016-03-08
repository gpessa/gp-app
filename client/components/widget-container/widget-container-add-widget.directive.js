'use strict';

angular.module('gpAppApp').directive('widgetContainerAddWidget', (WidgetService, widgetList) => {
  return {
    'templateUrl' : 'components/widget-container/widget-container-add-widget.html',
    'restrict' : 'E',
    'replace' : true,
    'require' : '^widgetContainer',
    'link' : function (scope, element, attrs, widgetContainer) {
      scope.availablewidgets = widgetList.get();

      scope.addWidget = function(widget){
        WidgetService.create(widget, function(widget){
          widgetContainer.addWidget(widget);
        });
      };
    }
  };
});
