'use strict';

angular.module('gpApp')
  .directive('withingsWidget', function (Auth, Withings, $timeout, $filter) {
    return {
      templateUrl: 'components/withings-widget/withings-widget.html',
      restrict: 'C',
      scope:{
        type: '@'
      }, 
      link: function (scope, element, attrs) {

        Withings.getData()
          .then( function(result) {
              scope.measures = result[scope.type];

              scope.labels = result.labels.map(function (e, index) {
                var dateNew = new Date(e);
                var dateOld = new Date(result.labels[index - 1]);
                return (dateNew.getMonth() != dateOld.getMonth() ? $filter('date')(dateNew, 'MMM yyyy') : '') 
              });

              var min = _.min(scope.measures, function(val){ if (val) { return val; }});
              var max = _.max(scope.measures);

              scope.options = {
                scaleFontColor: "#fff",
                scaleLineColor: "#fff",
                resposinve:true,
                pointDotRadius : 1,
                scaleFontFamily : 'Roboto',
                tooltipFontFamily : 'Roboto',
                animation: false,
                showTooltips: false,
                scaleOverride : true,
                scaleStepWidth : 1,
                datasetStrokeWidth : 1,
                showXAxisLabel:false,
                scaleLabel: "<%= value %>" + (scope.type == 'weights' ? ' kg.' : '%'),
                scaleStartValue : min,
                scaleSteps : Math.floor(max - min) + 1
              };

              scope.colours = [{
                fillColor: "rgba(229, 67, 80, 1)",
                pointColor: "rgba(255, 255, 255, 1)",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255, 255, 255, 1)",
                pointStrokeColor: "#fff",
                strokeColor: "rgba(255, 255, 255, 1)"
              }];
          })
        }
    };
  });