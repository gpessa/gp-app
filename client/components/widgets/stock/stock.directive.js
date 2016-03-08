'use strict';

angular.module('gpAppApp')
  .directive('stockWidget', function (socket, stockService, userStatus, widgetList) {
    return {
      'templateUrl' : 'components/widgets/stock/stock.html',
      'restrict' : 'C',
      'require' : '^^widget',
      'link' : function(scope, element, attr, widget) {
        widgetList.add({
          'name' : 'Stocks',
          'type' : 'stock',
          'icon' : 'fa fa-university'
        });

        scope.create = function(form){
          scope.submitted = true;

          if (form.$valid) {
            stockService.create(scope.newStock)
            .then(() => {
              scope.get();
              scope.resetForm();
            });
          }
        };

        scope.resetForm = function(){
          scope.submitted = false;
          scope.openAdd = false;
          scope.newStock.symbol = '';
        };

        scope.remove = function(stock){
          stockService.remove(stock).then(scope.get);
        };

        scope.get = function(){
          widget.toggleLoading();
          stockService.get()
            .then(stocks => {
              scope.stocks = stocks;
            })
            .catch(error => {
              scope.error = error;
            })
            .finally(() => {
              widget.toggleLoading();
            });
        };

        userStatus.focus(scope.get);
        scope.get();
      }
    };
  });
