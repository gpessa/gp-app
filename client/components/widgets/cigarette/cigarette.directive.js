'use strict';

angular.module('gpAppApp').directive('cigaretteWidget', () => {
  return {
    'templateUrl' : 'components/widgets/cigarette/cigarette.html',
    'restrict' : 'C',
    'require' : '^^widget',
    'controller' : 'CigaretteController',
    'controllerAs' : 'cigarette',
    'link' : function (scope, attr, element, widget) {
      widget.extendConfigurationProperties({
        'threshold' : {
          type: 'number',
          title: 'Threshold'
        }
      });
    }
  };
});
