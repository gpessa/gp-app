'use strict';

angular
  .module('gpAppApp')
  .directive('widgetBalance', ($filter, BalanceResource, socket, chartConfiguration) => {
    return {
      'templateUrl' : 'components/widgets/balance/balance.html',
      'require' : '^^item',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function(scope, element, attr, item) {
        scope.chartConfiguration = angular.copy(chartConfiguration);

        angular.extend(scope.chartConfiguration.options, {
          scaleStartValue : 0,
          showTooltips : true,
          tooltipTemplate: function(obj){
            return $filter('currency')(obj.value);
          },
          scaleLabel: function(obj){
            return $filter('currency')(obj.value);
          }
        });

        scope.get = function(){
          item.toggleLoading();

          scope.balance = new BalanceResource();
          scope.balance
            .$get()
            .catch(error => scope.error = error)
            .finally(() => item.toggleLoading());
        };

        scope.addReport = function(form){
          if(form.$valid){
            var newReport = angular.copy(scope.newReport);
            scope.balance.reports.push(newReport);
            scope.balance.$save();

            scope.newReport = {};
            form.$setPristine();
          }
        };

        scope.removeReport = function(balance, report){
          scope.balance.reports.remove(report);
          scope.balance.$save();
        };

        scope.get();
      }
    };
  });
