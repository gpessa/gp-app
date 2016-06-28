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

  it('should create a link', function() {
    compileDirective('<edit-mode></edit-mode>');

    expect(element.find('a').length)
      .to.equal(1);
  });

  it('should toggle the editMode on click on the link', function() {
    compileDirective('<edit-mode></edit-mode>');
    element.find('a').click();

    expect(editMode.toggle.calledOnce)
      .to.equal(true);
  });

  it('should have the appropriate content', function() {
    compileDirective('<edit-mode>test</edit-mode>');

    expect(element.find('a').text())
      .to.equal('test');
  });

});
