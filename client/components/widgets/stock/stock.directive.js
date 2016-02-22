'use strict';

angular.module('gpAppApp')
  .directive('stockWidget', function () {
    return {
      'templateUrl' : 'components/widgets/stock/stock.html',
      'restrict' : 'C',
      'require' : '^^widget',
      'controller' : 'StockController',
      'controllerAs' : 'vm',
      'bindToController' : true
    };
  });
