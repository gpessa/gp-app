'use strict';

describe('Directive: cigarette', function () {

  // load the directive's module and view
  beforeEach(module('gpAppApp'));
  beforeEach(module('components/cigarette/cigarette.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cigarette></cigarette>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the cigarette directive');
  }));
});
