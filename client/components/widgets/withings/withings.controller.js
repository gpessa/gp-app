'use strict';

(function() {

  class WithingsController {

    constructor($filter, Withings, chartConfiguration, dateFormat) {
      this.chartConfiguration = angular.copy(chartConfiguration);
      this.Withings = Withings;
      this.$filter = $filter;
      this.dateFormat = dateFormat;

      this.types = [{
        'label' : 'Weight',
        'value' : 'weights'
      },{
        'label' : 'Fat',
        'value' : 'fats'
      }];

      this.select(this.types[0]);
    }

    createChart(){
      this.Withings.get()
      .then(result => {
        this.measures = result.measures[this.selectedType.value];

        function getLastMeasure(measures){
          var index = measures.length;
          while (!measures[index]){
            index = index - 1;
          }
          return index;
        }
        var lastMeasure = getLastMeasure(this.measures);

        var unit = {
          'fats'  : '%',
          'weights' : ' kg.'
        }[this.selectedType.value];

        this.lastMeasure = this.measures[lastMeasure] + unit;
        this.lastMeasureDate = result.labels[lastMeasure];

        this.labels = result.labels.map(function (e, index) {
          var dateNew = new Date(e);
          var dateOld = new Date(result.labels[index - 1]);
          return (dateNew.getMonth() !== dateOld.getMonth() ? this.$filter('date')(dateNew, 'MMM yyyy') : '');
        }.bind(this));

        var min = _.min(this.measures, function(val){ if (val) { return val; }});
        var max = _.max(this.measures);

        angular.extend(this.chartConfiguration.options, {
          scaleOverride : true,
          scaleLabel: ' <%= value %>' + unit,
          scaleStartValue : min,
          scaleSteps : Math.floor(max - min) + 1
        });
      })
      .catch(err => this.error = err.message);
    }

    select(type){
      this.selectedType = type;
      this.createChart();
    }
  }

  angular.module('gpAppApp')
         .controller('WithingsController', WithingsController);

})();
