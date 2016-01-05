'use strict';

angular.module('gpAppApp')
  .directive('widgetContainer', function (widgetContainerService, socket) {
    return {
      templateUrl: 'components/widget-container/widget-container.html',
      restrict: 'E',
      replace:true,
      scope: {
        id : '@'
      },
      controller: function ($scope) {

        $scope.sortable_option = {
          handle:'.widget-header',
          stop:function(list, dropped_index){
            $scope.updateWidgetContainer();
          }
        };

        $scope.removeWidgetContainer = function(){
          widgetContainerService.remove( $scope.widgetContainer , function(widgetContainer){
            $scope.widgetContainer = widgetContainer;
          });
        };

        $scope.updateWidgetContainer = function(){
          widgetContainerService.update( $scope.widgetContainer , function(widgetContainer){
            $scope.widgetContainer = widgetContainer;
          });
        };

        $scope.showWidgetContainer = function(){
          widgetContainerService.show( $scope.id )
          .then(function(widgetContainer){
            $scope.widgetContainer = widgetContainer;
            socket.syncUpdates('widget-container', $scope.widgetContainer); 
          })
          .catch(function(err) {
            widgetContainerService.create($scope.id, function(widgetContainer){
              $scope.widgetContainer = widgetContainer;
            });
          })
        }

        $scope.showWidgetContainer();

        return {
          updateWidgetContainer : $scope.updateWidgetContainer,
          showWidgetContainer : $scope.showWidgetContainer
        }
      }
    };
  });
