'use strict';

angular.module('gpAppApp')
  .directive('portfolioWidget', function ($window, $interval, socket, userStatus, portfolioService, widgetList) {
    return {
      'templateUrl' : 'components/widgets/portfolio/portfolio.html',
      'restrict' : 'C',
      'require' : '^^widget',
      'scope' : true,
      'link' : function(scope, element, attr, widget) {
        widgetList.add({
          'name' : 'Portfolio',
          'type' : 'portfolio',
          'icon' : 'fa fa-exchange'
        });
        var removeWatch = angular.noop;

        scope.taxation = widget.getConfiguration().taxation;

        widget.extendConfigurationProperties({
          'taxation' : {
            type: 'number',
            title: 'Taxation'
          }
        });

        scope.operations = [{
          id: 'sell',
          label: 'Sell'
        }, {
          id: 'buy',
          label: 'Buy'
        },{
          id: 'dividend',
          label: 'Dividend'
        }];

        scope.get = function(){
          widget.toggleLoading();
          portfolioService.get()
            .then((portfolios) => {
              scope.portfolios = portfolios;
              socket.syncUpdates('portfolios');
            })
            .catch(error => {
              scope.error = error;
            })
            .finally(widget.toggleLoading);
        };

        scope.create = function(){
          portfolioService.create().then(scope.get);
        };

        scope.update = function(portfolio){
          portfolioService.update(portfolio);
        };

        scope.remove = function(portfolio){
          portfolioService.remove(portfolio).then(scope.get);
        };

        scope.addTransaction = function(portfolio, form){
          form.submitted = true;

          if(form.$valid){
            removeWatch();
            var newTransaction = angular.copy(portfolio.newTransaction);
            delete portfolio.newTransaction;
            portfolio.transactions.push(newTransaction);
            portfolioService.update(portfolio).then(scope.get);

            form.submitted = false;
          }
        };

        scope.removeTransaction = function(portfolio, transaction){
          portfolio.transactions.remove(transaction);
          portfolioService.update(portfolio).then(scope.get);
        };

        scope.updateTransaction = function(portfolio, transaction){
          portfolio.addNew = true;
          portfolio.transactions.remove(transaction);
          portfolio.newTransaction = angular.copy(transaction);
        };

        scope.splitTransaction = function(portfolio, transaction){
          portfolio.addNew = true;
          portfolio.newTransaction = angular.copy(transaction);

          removeWatch = scope.$watch(function(){
            return portfolio.newTransaction.quantity;
          }, function(){
            transaction.quantity = portfolio.newTransaction.quantitymax - (portfolio.newTransaction.quantity || 0);
          });

          delete portfolio.newTransaction._id;
          portfolio.newTransaction.operation = 'sell';
          portfolio.newTransaction.quantitymax = portfolio.newTransaction.quantity;
          portfolio.newTransaction.date = new Date();
        };

        scope.configuration = widget.getConfiguration();

        scope.get();
        //userStatus.focus(scope.get);
      }
  };
});
