'use strict';

angular.module('gpAppApp').directive('widgetContainer', (WidgetContainerService, socket) => {
  return {
    'templateUrl' : 'components/widget-container/widget-container.html',
    'restrict' : 'E',
    'replace' : true,
    'scope' : {
      'id' : '@'
    },
    'controller' : function ($scope, $filter) {
      $scope.sortable_option = {
        "handle" : ".widget-header",
        "stop" : function(){
          $scope.updateWidgetContainer(false);
        }
      };

      $scope.renderWidgetContainer = function(){
        WidgetContainerService
          .show( $scope.id )
          .then(function(widgetContainer){
            $scope.widgetContainer = widgetContainer;
            socket.syncUpdates('widget-container', $scope.widgetContainer);
          });
      }

      $scope.removeWidgetContainer = function(){
        WidgetContainerService.remove( scope.widgetContainer , function(widgetContainer){
          $scope.widgetContainer = widgetContainer;
        });
      };

      $scope.updateWidgetContainer = function(refreshView = true){
        WidgetContainerService.update( $scope.widgetContainer , function(widgetContainer){
            $scope.widgetContainer = widgetContainer;
        });
      };

      $scope.addWidget = function(widget){
        $scope.widgetContainer.widgets.push(widget);
        $scope.updateWidgetContainer();
      }

      $scope.renderWidgetContainer();

      return {
        'addWidget' : $scope.addWidget,
        'refreshContainer' : $scope.renderWidgetContainer
      }
    }
  }
});
