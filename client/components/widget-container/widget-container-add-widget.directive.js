'use strict';

angular.module('gpAppApp')
  .directive('addWidget', function (widgetContainerService, widgetService, socket) {
    return {
      templateUrl: 'components/widget-container/widget-container-add-widget.html',
      restrict: 'E',
      scope: true,
      replace:true,
      require: '^widgetContainer',
      link: function (scope, element, attrs, widgetContainer) {
        
        scope.addWidget = function(widget){
          var widget = {
            'type' : widget.id
          };

          widgetService.create(widget, function(widget){
            scope.widgetContainer.widgets.push(widget);
            scope.updateWidgetContainer();
          })
        };

        scope.availablewidgets = [{
          'name' : 'Shopping List',
          'id' : 'shopping-list',
          'icon' : 'fa fa-shopping-cart'
        },{
          'name' : 'Cigarette',
          'id' : 'cigarette',
          'icon' : 'icon icon-cigarette'
        },{
          'name' : 'Withings',
          'id' : 'withings',
          'icon' : 'fa fa-line-chart'
        },{
          'name' : 'Buienradar',
          'id' : 'buienradar',
          'icon' : 'fa fa-sun-o'
        }];

      }
    };
  });


//'cigarette', 'buienradar', 