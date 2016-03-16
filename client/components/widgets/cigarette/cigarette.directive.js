'use strict';

angular
  .module('gpAppApp')
  .directive('widgetCigarette', (cigaretteService) => {
    return {
      'templateUrl' : 'components/widgets/cigarette/cigarette.html',
      'require' : '^^widget',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function (scope, attr, element, widget) {
        scope.widget = widget.getConfiguration();

        widget.addConfigurations({
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
