'use strict';

describe('Controller: OauthButtonsCtrl', function() {

  // load the controller's module
  beforeEach(module('gpAppApp'));

  var OauthButtonsCtrl, $window;

  // Initialize the controller and a mock $window
  beforeEach(inject(function($controller) {
    $window = {
      location: {}
    };

    OauthButtonsCtrl = $controller('OauthButtonsCtrl', {
      $window: $window
    });
  }));

  it('should attach loginOauth', function() {
    expect(OauthButtonsCtrl.loginOauth).to.be.a('function');
  });

  it('should redirect to the right login page', function() {
    OauthButtonsCtrl.type = 'connect';
    OauthButtonsCtrl.loginOauth('facebook');

    expect($window.location.href).to.equal('/auth/facebook/connect');
  });

  it('should redirect to the right connect page', function() {
    OauthButtonsCtrl.type = 'login';
    OauthButtonsCtrl.loginOauth('facebook');

    expect($window.location.href).to.equal('/auth/facebook');
  });

});
