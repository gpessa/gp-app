'use strict';

describe('Controller: ItemController', function() {

  // load the controller's module
  beforeEach(module('gpAppApp'));

  var ItemController, ItemResource;

  // Initialize the controller and a mock $window
  beforeEach(inject(function($controller, _ItemResource_) {
    ItemResource = _ItemResource_;

    //sinon.spy(ItemResource, '$save');
    //sinon.spy(ItemResource, '$remove');

    ItemController = $controller('ItemController', {
      ItemResource : ItemResource
    });

  }));

  it('should have isItemLoading equals to false', function() {
    expect(ItemController.isItemLoading)
      .to.equal(false);
  });

  it('should have isSettingsOpen equals to false', function() {
    expect(ItemController.isSettingsOpen)
      .to.equal(false);
  });

  it('should toggle isItemLoading when call the method toggleLoading', function() {
    expect(ItemController.isItemLoading)
      .to.equal(false);

    ItemController.toggleLoading();

    expect(ItemController.isItemLoading)
      .to.equal(true);
  });

  it('should toggle toggleSettings when call the method toggleSettings', function() {
    expect(ItemController.isSettingsOpen)
      .to.equal(false);

    ItemController.toggleSettings();

    expect(ItemController.isSettingsOpen)
      .to.equal(true);
  });

  it('should add the new setting in the schema if addSettings is called', function() {
    let property = {
      'threshold' : {
        type: 'number',
        title: 'Threshold'
      }
    };
    ItemController.addSettings(property);

    expect(ItemController.schema.properties.settings.properties)
      .to.deep.equal(property);
  });




});
