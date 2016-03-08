'use strict';

angular.module('gpAppApp').directive('withingsWidget', ($filter, chartConfiguration, Withings, formats, widgetList) => {
  return {
    'templateUrl' : 'components/widgets/withings/withings.html',
    'restrict' : 'C',
    'require' : '^^widget',
    'scope' : true,
    'link' : function(scope, element, attr, widget) {
      widgetList.add({
        'name' : 'Withings',
        'type' : 'withings',
        'icon' : 'fa fa-line-chart'
      });
      scope.chartConfiguration = angular.copy(chartConfiguration);

      scope.types = [{
        'label' : 'Weight',
        'value' : 'weights'
      },{
        'label' : 'Fat',
        'value' : 'fats'
      }];

      scope.createChart = function(){
        Withings.get()
          .then((result) => {
            scope.measures = result.measures[scope.selectedType.value];

            function getLastMeasure(measures){
              var index = measures.length;
              while (!measures[index]){
                index = index - 1;
              }
              return index;
            }
            var lastMeasure = getLastMeasure(scope.measures);

            var unit = {
              'fats'  : '%',
              'weights' : ' kg.'
            }[scope.selectedType.value];

            scope.lastMeasure = scope.measures[lastMeasure] + unit;
            scope.lastMeasureDate = result.labels[lastMeasure];

            scope.labels = result.labels.map(function (e, index) {
              var dateNew = new Date(e);
              var dateOld = new Date(result.labels[index - 1]);
              return (dateNew.getMonth() !== dateOld.getMonth() ? $filter('date')(dateNew, formats.month) : '');
            }.bind(this));

            var min = _.min(scope.measures, function(val){ if (val) { return val; }});
            var max = _.max(scope.measures);

            angular.extend(scope.chartConfiguration.options, {
              'scaleOverride' : true,
              'scaleLabel': '<%= value %>' + unit,
              'scaleStartValue' : min,
              'scaleSteps' : Math.floor(max - min) + 1
            });
          })
          .catch(error => {scope.error = error;})
          .finally(widget.toggleLoading);
      };

      scope.select = function(type){
        widget.toggleLoading();
        scope.selectedType = type;
        scope.createChart();
      };

      scope.select(scope.types[0]);
    }
  };
});
