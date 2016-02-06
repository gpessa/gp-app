'use strict';

angular.module('gpAppApp')
  .directive('user', function () {
    return {
      'templateUrl' : 'components/user/user.html',
      'restrict' : 'E',
      'replace' : true,
      'scope' : {
        'user' : '=data'
      }
    };
  });
