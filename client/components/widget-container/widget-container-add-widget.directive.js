'use strict';

angular.module('gpAppApp')
  .directive('addWidget', function (widgetContainerService, widgetService, socket) {
    return {
      templateUrl: 'components/widget-container/widget-container-add-widget.html',
      restrict: 'EA',
      scope: true,
      require: '^widgetContainer',
      link: function (scope, element, attrs, widgetContainer) {
        
        scope.addWidget = function(){

          var widget = {
            "type" : scope.widgetToAdd.id
          };

          widgetService.create(widget, function(widget){
            scope.widgetToAdd.id = undefined;
            scope.widgetContainer.widgets.push(widget);
            scope.updateWidgetContainer();
          })
        };

        scope.availablewidgets = [{
          name : 'Shopping List',
          id : 'shopping-list'
        },{
          name : 'Cigarette',
          id : 'cigarette'
        },{
          name : 'Withings',
          id : 'withings'
        },{
          name : 'Buienradar',
          id : 'buienradar'
        }];


      }
    };
  });


//'cigarette', 'buienradar', 