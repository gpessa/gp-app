'use strict';

angular
  .module('gpAppApp')
  .directive('widget', ($compile) => {
    return {
      'templateUrl' : 'components/widget/widget.html',
      'require' : '^^item',
      'restrict' : 'E',
      'replace' : true,
      'link' : function(scope, element, attr, item){
        scope.item = item;

        var widgetBody = angular.element(element[0].querySelector('.widget-body')).addClass('widget-' + scope.item.model.subtype);
        $compile(widgetBody)(scope);
      }
    };
  });
