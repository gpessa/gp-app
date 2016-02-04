'use strict';

angular.module('gpAppApp')
  .directive('cigaretteWidget', function (CigaretteService, dateFormat) {
    return {
      'templateUrl' : 'components/widgets/cigarette/cigarette.html',
      'restrict' : 'CEA',
      'require' : '^^widget',
      'link' : function (scope, attr, element, widget) {

        widget.extendConfigurationProperties({
          "threshold" : {
            type: "number",
            title: "Threshold"
          }
        });

        scope.dateFormat = dateFormat;

        scope.smoke = function(){
          CigaretteService.create();

          CigaretteService.get().then(function(cigarettes){
            scope.cigarettes = cigarettes;
          });
        };

        CigaretteService.get().then(function(cigarettes){
          scope.cigarettes = cigarettes;
        });
      }
    };
  });
