'use strict';

angular
  .module('gpAppApp')
  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, availablechildren) {
    $scope.availablechildren = availablechildren;

    $scope.addChild = function (child, type) {
      $uibModalInstance.close({
        child,
        type
      });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })
  .directive('addChild', ($uibModal, WidgetResource, ContainerResource) => {
    return {
      'templateUrl' : 'components/container/add-child/add-child.html',
      'restrict' : 'E',
      'replace' : true,
      'require' : '^container',
      'link' : function (scope, element, attrs, container) {

        scope.availablechildren = {
            'Widget' : [{
                'icon' : 'fa fa-list',
                'type' : 'todo-list',
                'name' : 'Todo List'
              },{
                'icon' : 'icon icon-cigarette',
                'type' : 'cigarette',
                'name' : 'Cigarette'
              },{
                'icon' : 'fa fa-line-chart',
                'type' : 'withings',
                'name' : 'Withings'
              },{
                'icon' : 'fa fa-sun-o',
                'type' : 'buienradar',
                'name' : 'Buienradar'
              },{
                'icon' : 'fa fa-university',
                'type' : 'stock',
                'name' : 'Stocks'
              },{
                'icon' : 'fa fa-exchange',
                'type' : 'portfolio',
                'name' : 'Portfolio'
              },{
                'icon' : 'fa fa-line-chart',
                'type' : 'balance',
                'name' : 'Balance'
              },{
                'icon' : 'fa fa-plus',
                'type' : 'positive-thing',
                'name' : 'Positive Thing'
              },{
                'icon' : 'fa fa-sun-o',
                'type' : 'forecast',
                'name' : 'Forecast'
            }],
            'Container' : [{
                'icon' : 'fa fa-square-o',
                'type' : 'basic',
                'name' : 'Basic'
            }]
        }

        scope.open = () => {
          var modalInstance = $uibModal.open({
            'templateUrl' : 'add-child-modal.html',
            'controller' : 'ModalInstanceCtrl',
            'size' : 'lg',
            'animation'  : false,
            'resolve' : {
              'availablechildren' : scope.availablechildren
            }
          });
          modalInstance.result.then((result) => {
            addChild(result.child, result.type);
          });
        }

        var addChild = (child, type) => {
          switch (type) {

            case 'Widget':
              var newWidget = new WidgetResource(child);
              newWidget.$create().then(child => {
                container.linkChild(child);
              });
              break;

            case 'Container':
              var newContainer = new ContainerResource(child);
              newContainer.$create().then(child => {
                container.linkChild(child);
              });
              break;
          }
        };
      }
    };
  });
