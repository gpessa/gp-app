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
          scope.submitted = true;

          if (form.$valid) {
            var stock = new StockResource(scope.newStock);
            stock
              .$create()
              .then(() => {
                scope.get();
                scope.resetForm();
              });
          }
        };

        scope.resetForm = function(){
          scope.submitted = false;
          scope.openAdd = false;
          scope.newStock = {};
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
