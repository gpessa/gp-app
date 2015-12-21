'use strict';

angular.module('gpAppApp')
  .directive('withingsWidget', function (Auth, Withings, $timeout, $filter, chartConfiguration) {
    return {
      templateUrl: 'components/widgets/withings/withings.html',
      restrict: 'C', 
      scope: {
        type : "@"
      },
      link: function (scope) {
        scope.type = scope.type || "weights";
        scope.chartConfiguration = angular.copy(chartConfiguration);

        var unit = {
          "fats"  : "%",
          "weights" : "kg."
        }[scope.type];

        Withings.getData()
          .then( function(result) {
              scope.measures = result.measures[scope.type];

              var lastIndex = function(){
                var index = scope.measures.length;
                while (!scope.measures[index]){
                  index = index - 1;
                }
                return index;
              }();

              scope.lastMeasure = scope.measures[lastIndex] + unit;
              scope.lastMeasureDate = result.labels[lastIndex];

              scope.labels = result.labels.map(function (e, index) {
                var dateNew = new Date(e);
                var dateOld = new Date(result.labels[index - 1]);
                return (dateNew.getMonth() !== dateOld.getMonth() ? $filter('date')(dateNew, 'MMM yyyy') : '');
              });

              var min = _.min(scope.measures, function(val){ if (val) { return val; }});
              var max = _.max(scope.measures);

              angular.extend(scope.chartConfiguration.options, { 
                scaleOverride : true,
                scaleLabel: '<%= value %>' + unit,
                scaleStartValue : min,
                scaleSteps : Math.floor(max - min) + 1
              });

          });
        }
    };
  });