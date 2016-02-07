'use strict';

angular.module('gpAppApp')
  .directive('withingsWidget', () => ({
    templateUrl: 'components/widgets/withings/withings.html',
    restrict: 'C',
    controller: 'WithingsController',
    controllerAs: 'withings'
  }));
