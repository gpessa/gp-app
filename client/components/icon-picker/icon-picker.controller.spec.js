'use strict';

describe('Controller: IconPicker', function() {

  // load the controller's module
  beforeEach(module('gpAppApp'));

  var IconPickerModalController, $uibModalInstance;

  // Initialize the controller and a mock $window
  beforeEach(inject(function($controller) {
    $uibModalInstance = {
      close : function(){}
    };

    IconPickerModalController = $controller('IconPickerModalController', {
      $uibModalInstance : $uibModalInstance
    });
  }));

  it('should dimsiss the modal and send back to the directive the selected icon', function() {
    sinon.spy($uibModalInstance, 'close');
    IconPickerModalController.select('test');

    expect($uibModalInstance.close.calledWith('test'))
      .to.equal(true);
  });

});
