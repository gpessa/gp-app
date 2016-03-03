'use strict';

angular.module('gpAppApp')
  .controller('OauthButtonsCtrl', function($window) {
    this.loginOauth = function(provider) {
      var op = (this.type === 'connect') ? '/connect' : '';
      $window.location.href = '/auth/' + provider + op;
    };
  });
