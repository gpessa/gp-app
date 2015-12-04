'use strict';

angular.module('gpAppApp')
  .directive('cigaretteWidget', function (cigaretteService) {
    return {
      templateUrl: 'components/cigarette/cigarette.html',
      restrict: 'CEA',
      link: function (scope) {

        scope.smoke = function(){
          cigaretteService.create();

          cigaretteService.get().then(function(cigarettes){
            scope.cigarettes = cigarettes;
          });
        };

        scope.deleteSmoke = function(smoke){
          cigaretteService.remove(smoke);
        };

        cigaretteService.get().then(function(cigarettes){
          scope.cigarettes = cigarettes;
        });
        
      }
    };
  });
