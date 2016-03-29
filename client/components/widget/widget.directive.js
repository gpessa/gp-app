'use strict';

angular.module('gpAppApp').directive('widget', ($compile) => {
  return {
    'templateUrl' : 'components/widget/widget.html',
    'require' : '^^?container',
    'bindToController' : true,
    'controllerAs' : '$ctrl',
    'restrict' : 'E',
    'replace' : true,
    'scope' : {
      'widget' : '=data'
    },
    'prority' : -1,
    'controller'  : 'WidgetController',
    'link' : function(scope, element, attr, container){
      var widgetBody = angular.element(element[0].querySelector('.widget-body')).addClass('widget-' + scope.$ctrl.widget.subtype);
      $compile(widgetBody)(scope);

      scope.remove = () => {
        container.unlinkChild(scope.$ctrl.widget);
        scope.$ctrl.remove();
      };

      scope.update = function(form){
        if (form.$valid) {
          scope.$ctrl.save();
          scope.$ctrl.toggleSettings();
        }
      };

    }
  };
});
