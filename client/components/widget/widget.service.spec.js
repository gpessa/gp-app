'use strict';

describe('Service: widget', function () {

  // load the service's module
  beforeEach(module('gpAppApp'));

  // instantiate service
  var widget;
  beforeEach(inject(function (_widget_) {
    widget = _widget_;
  }));

  it('should do something', function () {
    expect(!!widget).toBe(true);
  });

});
