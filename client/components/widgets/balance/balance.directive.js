'use strict';

angular.module('gpAppApp').directive('balanceWidget', ($filter, balanceService, socket, formats,chartConfiguration) => {
  return {
    'templateUrl' : 'components/widgets/balance/balance.html',
    'restrict' : 'C',
    'scope'  : true,
    'require' : '^^widget',
    'link' : function(scope, element, attr, widget) {
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
        widget.toggleLoading();
        balanceService.get()
          .then((balances) => {
            if(balances.length == 0){
              scope.create();
            } else {
              scope.balances = balances;
            }
            socket.syncUpdates('balances');
          })
          .catch(error => {
            scope.error = error;
          })
          .finally(widget.toggleLoading);
      };

      scope.create = function(){
        balanceService.create().then(scope.get);
      };

      scope.update = function(balance){
        balanceService.update(balance);
      };

      scope.addReport = function(balance, form){
        form.submitted = true;

        if(form.$valid){
          var newReport = angular.copy(balance.newReport);
          delete balance.newReport;
          balance.reports.push(newReport);
          balanceService.update(balance).then(scope.get);

          form.submitted = false;
        }
      }

      scope.removeReport = function(balance, transaction){
        var index = balance.reports.indexOf(transaction);
        balance.reports.splice(index, 1);
        balanceService.update(balance).then(scope.get);
      }

      scope.getReportData = function(balance){
        return balance.reports.map(function(report){
          return (report.current + report.saving);
        })
      }

      scope.getReportLabels = function(balance){
        return balance.reports.map(function(report){
          return $filter('date')(report.date, formats.month) ;
        })
      }

      scope.getChartData = function(balance){
        return {
          data : scope.getReportData(balance),
          labels : scope.getReportLabels(balance)
        }
      }

      scope.get();
    }
  };
});
