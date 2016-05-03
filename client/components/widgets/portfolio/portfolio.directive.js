'use strict';

angular
  .module('gpAppApp')
  .directive('widgetPortfolio', function ($window, $interval, socket, userStatus, PortfolioResource, formats) {
    return {
      'templateUrl' : 'components/widgets/portfolio/portfolio.html',
      'require' : '^^item',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function(scope, element, attr, item) {
        scope.formats = formats;
        scope.item = item;

        var removeWatch = angular.noop;

        item.addConfigurations({
          'taxation' : {
            'type' : 'number',
            'title' : 'Taxation',
            'default' : 26
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
          item.toggleLoading();
          scope.portfolios = PortfolioResource.query({}, () => item.toggleLoading());
        };

        scope.create = function(){
          var portfolio = new PortfolioResource();
          portfolio
            .$create()
            .then(() => scope.get());
        };

        scope.update = function(portfolio){
          portfolio
            .$save();
        };

        scope.remove = function(portfolio){
          portfolio
            .$remove()
            .then(() => scope.get());
        };

        scope.addTransaction = function(portfolio, form){
          if(form.$valid){
            removeWatch();
            var newTransaction = angular.copy(portfolio.newTransaction);
            delete portfolio.newTransaction;
            portfolio.transactions.push(newTransaction);
            portfolio
              .$save()
              .then(() => scope.get());

            portfolio.newTransaction = {};
            form.$setPristine();
          }
        };

        scope.removeTransaction = function(portfolio, transaction){
          portfolio.transactions.remove(transaction);
          portfolio
            .$save();
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

        scope.get();
      }
  };
});
