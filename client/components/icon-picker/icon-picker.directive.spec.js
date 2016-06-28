'use strict';

describe('Directive: iconPicker', function() {

  // load the directive's module and view
  beforeEach(module('gpAppApp'));
  beforeEach(module('components/icon-picker/icon-picker.html'));

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

  it('should create an instance of a modal', function() {
    compileDirective('<icon-picker icon="icon" on-select="callback()"></icon-picker>');
    sinon.spy(elementScope, 'open');
    element.find('.icon-picker').click();

    expect(elementScope.open.calledOnce)
      .to.equal(true);
  });

  it('should see a modal with a list of icons', function() {
    compileDirective('<icon-picker icon="icon" on-select="callback()"></icon-picker>');
    element.find('.icon-picker').click();

    expect(angular.element('body').find('.icon-picker__icon-list a').length)
      .to.be.at.least(1);
  });

  it('should select the callback on a icon click and show the selected icon', function() {
    parentScope.callback = function(){};
    sinon.spy(parentScope, 'callback');
    compileDirective('<icon-picker icon="icon" on-select="callback()"></icon-picker>');

    element.find('.icon-picker').click();
    var firsticon = angular.element('body').find('.icon-picker__icon-list a').eq(0).click();
    angular.element(firsticon).click();

    expect(parentScope.callback.calledOnce)
      .to.equal(true);

    expect(element.find('.icon-picker__icon').hasClass('fa-glass'))
      .to.equal(true);
  });
});
