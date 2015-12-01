'use strict';

describe('Directive: withingsWidget', function () {

  // load the directive's module and view
  beforeEach(module('gpApp'));
  beforeEach(module('components/withings-widget/withings-widget.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<withings-widget></withings-widget>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the withingsWidget directive');
  }));
});