'use strict';

angular.module('gpAppApp')
  .directive('oauthButtons', function() {
    return {
      templateUrl: 'components/oauth-buttons/oauth-buttons.html',
      restrict: 'EA',
      controller: 'OauthButtonsCtrl',
      controllerAs: 'OauthButtons',
      bindToController: true,
      replace:true,
      scope : {
        url : '@type'
      }
    };
  });
