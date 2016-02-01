'use strict';

angular.module('gpAppApp')
  .directive('widgetContainerAddWidget', () => ({
    templateUrl: 'components/widget-container/widget-container-add-widget.html',
    restrict: 'E',
    replace:true,
    require: '^WidgetContainerController',
    controller: 'WidgetContainerAddWidgetController',
    controllerAs: 'vm',
    bindToController: true,
    scope:true
  }));