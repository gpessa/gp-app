'use strict';

angular.module('gpAppApp').directive('shoppingListWidget', () => {
  return {
    'templateUrl' : 'components/widgets/shopping-list/shopping-list.html',
    'restrict' : 'C',
    'require' : '^^widget',
    'controller' : 'ShoppingListController',
    'controllerAs' : 'vm'
  };
});
