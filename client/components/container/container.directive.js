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
        var containerBody = element.addClass('container-' + item.model.subtype);
        $compile(containerBody)(scope);
      }
    };
  });
