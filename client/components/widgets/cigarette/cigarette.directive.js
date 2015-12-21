'use strict';

angular.module('gpAppApp')
  .directive('cigaretteWidget', function (cigaretteService) {
    return {
      templateUrl: 'components/widgets/cigarette/cigarette.html',
      restrict: 'CEA',
      link: function (scope) {

        scope.smoke = function(){
          cigaretteService.create();

          cigaretteService.get().then(function(cigarettes){
            scope.cigarettes = cigarettes;
          });
        };

        cigaretteService.get().then(function(cigarettes){
          scope.cigarettes = cigarettes;
        });
        
      }
    };
  });
