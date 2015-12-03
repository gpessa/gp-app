'use strict';

angular.module('gpAppApp')
  .directive('cigaretteWidget', function (cigaretteService) {
    return {
      templateUrl: 'components/cigarette/cigarette.html',
      restrict: 'CEA',
      link: function (scope, element, attrs) {

        scope.smoke = function(){
          cigaretteService.create();
        }

        cigaretteService.get().then(function(cigarettes){
          scope.cigarettes = cigarettes;
          socket.syncUpdates('cigarette', scope.cigarettes);
        })

        scope.$on('$destroy', function () {
          socket.unsyncUpdates('cigarette');
        });
        
      }
    };
  });
