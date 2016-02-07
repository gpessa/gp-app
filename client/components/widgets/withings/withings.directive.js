'use strict';

angular.module('gpAppApp').directive('withingsWidget', () => {
  return {
    'templateUrl' : 'components/widgets/withings/withings.html',
    'restrict' : 'C',
    'require' : '^^widget',
    'controller' : 'WithingsController',
    'controllerAs' : 'vm'
  }
});
