'use strict';

(function() {

  class StockController {

    constructor($window, $interval, socket, stockService) {
      this.stockService = stockService;
      this.socket = socket;
      this.$window = $window;
      this.$interval = $interval;

      this.get();
    }

    add(form){
      this.submitted = true;

      if (form.$valid) {
        this.stockService.create(this.stock)
        .then(() => {
          this.get()
        })
        .catch(err => {
          this.errors.other = err.message;
        });
      }
    }

    remove(stock){
      this.stockService.remove(stock).then(() => {
        this.get()
      });
    }

    get(){
      this.stockService.get()
        .then((stocks) => {
          this.stocks = stocks;
          this.socket.syncUpdates('stock', function(){
            console.log('socket');
          });
        });
    }
  }

  angular.module('gpAppApp')
         .controller('StockController', StockController);

})();
