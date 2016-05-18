'use strict';

angular
  .module('gpAppApp')
  .directive('subMenuBtn', () => {
    return {
      'templateUrl' : 'components/sub-menu-btn/sub-menu-btn.html',
      'restrict': 'C',
      'transclude': true,
      'replace': true
    };
  });
