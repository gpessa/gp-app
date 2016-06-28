'use strict';

describe('Directive: oauthButtons', function() {

  // load the directive's module and view
  beforeEach(module('gpAppApp'));
  beforeEach(module('components/oauth-buttons/oauth-buttons.html'));

  var element, parentScope, elementScope;

  var compileDirective = function(template) {
    inject(function($compile) {
      element = angular.element(template);
      element = $compile(element)(parentScope);
      parentScope.$digest();
      elementScope = element.isolateScope();
    });
  };

  beforeEach(inject(function($rootScope) {
    parentScope = $rootScope.$new();
  }));

  it('should contain anchor buttons', function() {
    compileDirective('<oauth-buttons></oauth-buttons>');
    expect(element.find('a.btn').length)
      .to.be.at.least(1);
  });

});
