'use strict';

angular
  .module('gpAppApp')
  .directive('widgetStock', function (socket, StockResource, userStatus) {
    return {
      'templateUrl' : 'components/widgets/stock/stock.html',
      'require' : '^^item',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function(scope, element, attr, item) {
        
        scope.create = function(form, stock){
          if (form.$valid) {
            stock = new StockResource(scope.newStock);
            stock
              .$create()
              .then(() => {
                scope.get();

                scope.openAdd = false;
                scope.newStock = {};
                form.$setPristine();
              });
          }
        };

        scope.remove = function(stock){
          stock
            .$remove()
            .then(() => scope.get());
        };

        scope.get = function(){
          item.toggleLoading();
          scope.stocks = StockResource.query({}, () => item.toggleLoading());
        };

        userStatus.focus(scope.get);
        scope.get();
      }
    };
  });
