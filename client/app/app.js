'use strict';

angular.module('gpAppApp', [
  'gpAppApp.auth',
  'gpAppApp.admin',
  'gpAppApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngMessages',
  'ngGeolocation',
  'btford.socket-io',
  'ui.bootstrap',
  'validation.match',
  'chart.js',
  'html5.sortable',
  'schemaForm'
])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
})
.constant('chartConfiguration', {
  options : {
    bezierCurve : false,
    scaleFontColor: '#fff',
    scaleLineColor: '#fff',
    resposinve:true,
    pointDotRadius : 2,
    scaleFontFamily : 'inherit',
    tooltipFontFamily : 'inherit',
    animation: false,
    showTooltips: false,
    scaleStepWidth : 1,
    datasetStrokeWidth : 1,
    showXAxisLabel:false,
    maintainAspectRatio: true
  },
    colours : [{
    fillColor: 'rgba(49, 147, 198, 0.3)',
    pointColor: 'rgba(27, 188, 157, 1)',
    pointHighlightFill: 'rgba(26, 188, 156, 1)',
    pointHighlightStroke: 'rgba(26, 188, 156, 1)',
    pointStrokeColor: 'rgba(65, 215, 185, 1)',
    strokeColor: 'rgba(255, 255, 255, 1)'
  }]
})
.constant('dateFormat', {
  day : 'dd MMM yyyy'
})
;
