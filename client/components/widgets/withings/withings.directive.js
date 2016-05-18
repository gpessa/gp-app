'use strict';

angular
  .module('gpAppApp')
  .directive('widgetWithings', ($filter, chartConfiguration, WithingsResource, formats) => {
    return {
      'templateUrl': 'components/widgets/withings/withings.html',
      'require': '^^item',
      'restrict': 'C',
      'scope': true,
      'link': function(scope, element, attr, item) {
        scope.chartConfiguration = angular.copy(chartConfiguration);
        scope.formats = formats;

        item.addConfigurations({
          'limit' : {
            type: 'number',
            title: 'Limit'
          }
        });

        // Chart
        scope.formatDate = (value) => {
          return $filter('date')(value, scope.formats.date);
        };

        scope.formatWeight = (value) => {
          return value + 'kg.';
        };

        scope.colors = () => {
          return undefined;
        };

        scope.columns = [{
          id : 'weight',
          type : 'area',
          name : 'Weight'
        },{
          id : 'fat',
          type : 'area',
          name : 'Fat'
        }];

        scope.x = {
          id : 'date',
          type : 'area',
          name : 'Total'
        };

        scope.createChart = () => {
          item.toggleLoading();

          scope.withing = new WithingsResource({
            'limit' : (item.model.configuration ? item.model.configuration.limit : undefined)
          });

          scope.withing
            .$get(() => {
              var lastweight = $filter('filter')(scope.withing.measuregrps, function(m){ return !!m.weight; });
              scope.lastweight = lastweight[lastweight.length - 1];

              var lastfat = $filter('filter')(scope.withing.measuregrps, function(m){ return !!m.fat; });
              scope.lastfat = lastfat[lastfat.length - 1];
            })
            .catch(error => scope.error = error)
            .finally(() => item.toggleLoading());
        };

        scope.createChart();
      }
    };
  });
