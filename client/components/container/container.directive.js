'use strict';

angular.module('gpAppApp').directive('container', (editMode) => {
  return {
    'templateUrl' : 'components/container/container.html',
    'require' : '^^?container',
    'bindToController' : true,
    'controllerAs' : '$ctrl',
    'restrict' : 'E',
    'replace' : true,
    'scope' : {
      'container' : '=data'
    },
    'controller' : 'ContainerController',
    'link' : function(scope, element, attr, container){
      scope.editMode = editMode;

      scope.remove = () => {
        container.unlinkChild(scope.$ctrl.container);
        scope.$ctrl.remove();
      };

    }
  };
});
