'use strict';

angular.module('gpAppApp')
  .directive('widget', function ($compile, widgetService) {
    return {
      templateUrl: 'components/widget/widget.html',
      restrict: 'C',
      require : "^widgetContainer",
      scope:{
        data : '='
      },
      link: function (scope, element, attrs, widgetContainer) {
        var template = '<div class="' + scope.data.type + '-widget"></div>';
        var content = $compile(template)(scope);
        element.find('.widget-body').append(content);

        scope.remove = function(){
          widgetService.remove(scope.data, widgetContainer.showWidgetContainer);

        }
      }
    };
  });
