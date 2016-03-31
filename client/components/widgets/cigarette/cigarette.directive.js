'use strict';

angular
  .module('gpAppApp')
  .directive('widgetCigarette', (CigaretteResource) => {
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
          scope.cigarettes.$smoke();
        };

        scope.get = function(){
          item.toggleLoading();

          scope.cigarettes = new CigaretteResource();
          scope.cigarettes
            .$get()
            .catch(error => scope.error = error)
            .finally(() => item.toggleLoading());
        };

        scope.get();
      }
    };
  });
