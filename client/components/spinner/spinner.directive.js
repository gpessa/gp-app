'use strict';

angular
  .module('gpAppApp')
  .directive('spinner', () => {
    return {
      'templateUrl' : 'components/spinner/spinner.html',
      'restrict' : 'E',
      'scope' : {
        'isLoading' : '='
      }
    };
  });
