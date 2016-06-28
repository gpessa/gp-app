'use strict';

angular
  .module('gpAppApp')
  .directive('iconPicker', ($timeout, $uibModal) => {
    return {
      'templateUrl' : 'components/icon-picker/icon-picker.html',
      'restrict' : 'E',
      'scope' : {
        'onSelect' : '&',
        'icon' : '='
      },
      'link' : function(scope){

        scope.open = function () {
          var modalInstance = $uibModal.open({
            templateUrl: 'icon-picker-modal.html',
            controller: 'IconPickerModalController',
            size: 'lg',
            bindToController : true,
            controllerAs:'ctrl'
          });

          modalInstance.result.then(function (icon) {
            scope.icon = 'fa ' + icon;
            scope.onSelect();
          });
        };
      }
    };
  });
