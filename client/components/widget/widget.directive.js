'use strict';

angular
  .module('gpAppApp')
  .directive('widget', () => {
    return {
      'templateUrl' : 'components/widget/widget.html',
      'require' : '^^item',
      'restrict' : 'C',
      'transclude' : true,
      'link' : function(scope, element, attr, item){
        scope.item = item;
      }
    };
  });
