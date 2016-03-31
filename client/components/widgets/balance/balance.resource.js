'use strict';

(function() {

  function BalanceResource($resource, $filter, formats) {

    var addChartData = function(response){
      var labels = response.reports.map(function(report){
        return $filter('date')(report.date, formats.month) ;
      });

      var data = response.reports.map(function(report){
        return (report.current + report.saving);
      });

      response.chart = {
        'data' : data,
        'labels' : labels
      }

      return response;
    }

    return $resource('/api/balances/:id', {'id' : '@_id'}, {
      get : {
        transformResponse : addChartData,
        responseType : 'json'
      },
      save: {
        transformResponse : addChartData,
        responseType : 'json',
        method: 'PUT'
      }
    });
  }

  angular.module('gpAppApp')
         .factory('BalanceResource', BalanceResource);

})();
