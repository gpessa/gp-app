'use strict';

angular.module('gpAppApp').directive('container', () => {
  return {
    'templateUrl' : 'components/container/container.html',
    'restrict' : 'E',
    'replace' : true,
    'scope' : {
      'id' : '@'
    },
    'bindToController' : true,
    'controller' : 'ContainerController',
    'controllerAs' : 'vm'
  };
});
