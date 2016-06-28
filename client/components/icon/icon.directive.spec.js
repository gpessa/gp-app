'use strict';

describe('Directive: addItem', function() {

  // load the directive's module and view
  beforeEach(module('gpAppApp'));

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

  it('should have the icon in the link', function() {
    compileDirective('<a icon="test"></add-item>');
    expect(element.find('i').length)
      .to.equal(1);
  });


});
