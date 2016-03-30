'use strict';

angular
  .module('gpAppApp')
  .directive('widgetCigarette', (cigaretteService) => {
    return {
      'templateUrl' : 'components/widgets/cigarette/cigarette.html',
      'require' : '^^item',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function (scope, attr, element, item) {
        scope.item = item;

        item.addConfigurations({
          'threshold' : {
            type: 'number',
            title: 'Threshold'
          }
        });

        scope.smoke = function(){
          cigaretteService
            .create()
            .then(scope.render);
        };

        scope.render = function(){
          item.toggleLoading();

          cigaretteService
            .get()
            .then((cigarettes) => {
              scope.cigarettes = cigarettes;
            })
            .finally(() => item.toggleLoading());
        };

        scope.render();
      }
    };
  });
