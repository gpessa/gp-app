'use strict';

angular.module('gpAppApp')
  .directive('cigaretteWidget', function (cigaretteService, dateFormat) {
    return {
      templateUrl: 'components/widgets/cigarette/cigarette.html',
      restrict: 'CEA',
      link: function (scope) {
        scope.schema.properties.configuration = {
          "type" : "object",
          "title" : "Preferences",
          "properties": {
            "threshold" : {
              type: "number",
              title: "Threshold"
            }
          },
        }

        scope.dateFormat = dateFormat;
        
        scope.smoke = function(){
          cigaretteService.create();

          cigaretteService.get().then(function(cigarettes){
            scope.cigarettes = cigarettes;
          });
        };

        cigaretteService.get().then(function(cigarettes){
          scope.widget.loading = false;
          scope.cigarettes = cigarettes;
        });
        
      }
    };
  });
