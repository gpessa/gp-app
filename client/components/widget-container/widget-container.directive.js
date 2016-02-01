'use strict';

angular.module('gpAppApp')
  .directive('widgetContainer', () => ({
    templateUrl: 'components/widget-container/widget-container.html',
    restrict: 'E',
    replace:true,
    controller: 'WidgetContainerController',
    controllerAs: 'vm',
    scope : {
      id : '@'
    },
    bindToController: true
  }));