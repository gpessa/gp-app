'use strict';

describe('Directive: item', function() {

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

  it('should create the dom', function() {
    parentScope.model = {
      'type' : 'type-test',
      'subtype' : 'subtype-test'
    };
    compileDirective('<item model="model"></item>');

    let typeDiv = element.find('.type-test');
    let subTypeDiv = typeDiv.find('.type-test-subtype-test');

    expect(typeDiv.length)
      .to.equal(1);

    expect(subTypeDiv.length)
      .to.equal(1);
  });

});
