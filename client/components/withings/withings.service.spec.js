'use strict';

describe('Service: withings', function () {

  // load the service's module
  beforeEach(module('gpAppApp'));

  // instantiate service
  var withings;
  beforeEach(inject(function (_withings_) {
    withings = _withings_;
  }));

  it('should do something', function () {
    expect(!!withings).toBe(true);
  });

});
