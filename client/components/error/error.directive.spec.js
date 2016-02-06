'use strict';

describe('Directive: error', function () {

  // load the directive's module and view
  beforeEach(module('gpAppApp'));
  beforeEach(module('components/error/error.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<error></error>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the error directive');
  }));
});
