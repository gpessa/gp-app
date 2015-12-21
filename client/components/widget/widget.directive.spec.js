'use strict';

describe('Directive: widget', function () {

  // load the directive's module and view
  beforeEach(module('gpAppApp'));
  beforeEach(module('components/widget/widget.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<widget></widget>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the widget directive');
  }));
});
