'use strict';

describe('Service: shoppingList', function () {

  // load the service's module
  beforeEach(module('gpApp'));

  // instantiate service
  var shoppingList;
  beforeEach(inject(function (_shoppingList_) {
    shoppingList = _shoppingList_;
  }));

  it('should do something', function () {
    expect(!!shoppingList).toBe(true);
  });

});
