'use strict';

angular
  .module('gpAppApp')
  .directive('widget', () => {
    return {
      'templateUrl' : 'components/widget/widget.html',
      'transclude' : true,
      'require' : '^^item',
      'restrict' : 'C',
      'link' : function(scope, element, attr, item){
        scope.item = item;
      }
    };
  });
