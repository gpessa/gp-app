'use strict';

angular.module('gpAppApp').directive('widgetContainer', (WidgetContainerService, socket) => {
  return {
    'templateUrl' : 'components/widget-container/widget-container.html',
    'restrict' : 'E',
    'replace' : true,
    'scope' : {
      'id' : '@'
    },
    'bindToController' : true,
    'controller' : 'WidgetContainerController',
    'controllerAs' : 'vm'
  };
});
