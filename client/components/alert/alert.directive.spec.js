'use strict';

describe('Directive: alert', function() {

  // load the directive's module and view
  beforeEach(module('gpAppApp'));
  beforeEach(module('components/alert/alert.html'));

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

  it('should have the appropriate class', function() {
      compileDirective('<alert type="test"></alert>');

      expect(element.hasClass('alert'))
        .to.equal(true);

      expect(element.hasClass('alert-test'))
        .to.equal(true);
  });

  it('should have the desire error message displayed', function() {
      compileDirective('<alert type="test">test test</alert>');

      expect(element.find('.clearfix').text())
        .to.equal('test test');
  });


});
