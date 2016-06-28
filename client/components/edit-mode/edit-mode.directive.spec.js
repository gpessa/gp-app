'use strict';

describe('Directive: editMode', function() {

  // load the directive's module and view
  beforeEach(module('gpAppApp'));

  var element, parentScope, elementScope, editMode;

  var compileDirective = function(template) {
    inject(function($compile) {
      element = angular.element(template);
      element = $compile(element)(parentScope);
      parentScope.$digest();
      elementScope = element.isolateScope();
    });
  };

  beforeEach(inject(function($rootScope, _editMode_) {
    parentScope = $rootScope.$new();
    editMode = _editMode_;

    sinon.spy(editMode, 'toggle');
  }));

  it('should toggle the editMode on click on the link', function() {
    compileDirective('<a edit-mode>test</a>');
    element.click();

    expect(editMode.toggle.calledOnce)
      .to.equal(true);
  });

});
