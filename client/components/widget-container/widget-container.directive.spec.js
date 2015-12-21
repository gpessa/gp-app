'use strict';

describe('Directive: widgetContainer', function () {

  // load the directive's module and view
  beforeEach(module('gpAppApp'));
  beforeEach(module('components/widget-container/widget-container.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<widget-container></widget-container>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the widgetContainer directive');
  }));
});
