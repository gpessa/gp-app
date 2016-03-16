'use strict';

angular
  .module('gpAppApp')
  .directive('widgetStock', function (socket, stockService, userStatus) {
    return {
      'templateUrl' : 'components/widgets/stock/stock.html',
      'require' : '^^widget',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function(scope, element, attr, widget) {
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
            .finally(widget.toggleLoading());
        };

        userStatus.focus(scope.get);
        scope.get();
      }
    };
  });
