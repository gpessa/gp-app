'use strict';

angular
  .module('gpAppApp')
  .directive('container', ($compile) => {
    return {
      'templateUrl' : 'components/container/container.html',
      'require' : '^^item',
      'restrict' : 'E',
      'replace' : true,
      'link' : function(scope, element, attr, item){
        scope.item = item;
        var containerBody = angular.element(element[0].querySelector('.body')).addClass('container-' + scope.item.model.subtype);
        $compile(containerBody)(scope);
      }
    };
  });
