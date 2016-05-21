'use strict';

angular
  .module('gpAppApp')
  .directive('widgetBalance', ($filter, BalanceResource, socket, chartConfiguration, formats) => {
    return {
      'templateUrl' : 'components/widgets/balance/balance.html',
      'require' : '^^item',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function(scope, element, attr, item) {
        scope.formats = formats;
        scope.chartConfiguration = angular.copy(chartConfiguration);

        angular.extend(scope.chartConfiguration.options, chartConfiguration.options, {
          scaleStartValue : 0,
          showTooltips : true,
          tooltipTemplate: (obj) => { return $filter('currency')(obj.value); },
          scaleLabel: (obj) => { return $filter('currency')(obj.value); }
        });

        scope.columns = [{
          id : 'total',
          type : 'bar',
          name : 'Total'
        }];

        scope.x = {
          id : 'date',
          type : 'bar',
          name : 'Total'
        };

        scope.formatDate = (value) => { return $filter('date')(value, scope.formats.date); };
        scope.formatTotal = (value) => { return $filter('currency')(value); };
        scope.colors = () => { return undefined; };

        scope.get = () => {
          item.toggleLoading();

          scope.balance = new BalanceResource();
          scope.balance
            .$get()
            .then(() => {
              scope.min = _.minBy(scope.balance.reports, (o) => { return o.total; }).total;
            })
            .catch(error => scope.error = error)
            .finally(() => { item.toggleLoading(); });
        };

        scope.addReport = (form) => {
          if(form.$valid){
            var newReport = angular.copy(scope.newReport);
            scope.balance.reports.push(newReport);
            scope.balance.$save();

            scope.newReport = {};
            form.$setPristine();
          }
        };

        scope.removeReport = (balance, report) => {
          scope.balance.reports.remove(report);
          scope.balance.$save();
        };

        scope.get();
      }
    };
  });
