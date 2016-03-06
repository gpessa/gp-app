'use strict';

angular.module('gpAppApp')
  .controller('OauthButtonsCtrl', function($window) {
    this.loginOauth = function(provider) {
      if(this.type === 'connect'){
        $window.location.href = '/auth/' + provider + '/connect';
      } else {
        $window.location.href = '/auth/' + provider;
      }
    };
  });
