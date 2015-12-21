'use strict';

describe('Service: cigarette', function () {

  // load the service's module
  beforeEach(module('gpAppApp'));

  // instantiate service
  var cigarette;
  beforeEach(inject(function (_cigarette_) {
    cigarette = _cigarette_;
  }));

  it('should do something', function () {
    expect(!!cigarette).toBe(true);
  });

});
