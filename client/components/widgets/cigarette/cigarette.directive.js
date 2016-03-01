'use strict';

angular.module('gpAppApp').directive('cigaretteWidget', (cigaretteService) => {
  return {
    'templateUrl' : 'components/widgets/cigarette/cigarette.html',
    'restrict' : 'C',
    'require' : '^^widget',
    'link' : function (scope, attr, element, widget) {
      scope.widget = widget;

      widget.extendConfigurationProperties({
        'threshold' : {
          type: 'number',
          title: 'Threshold'
        }
      });

      scope.smoke = function(){
        cigaretteService.create()
          .then(scope.render);
      };

      scope.render = function(){
        cigaretteService.get()
          .then((cigarettes) => {
            scope.cigarettes = cigarettes;
          });
      };

      scope.render();
    }
  };
});
