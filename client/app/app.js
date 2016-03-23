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
  'schemaForm',
  'angular-click-outside',
  'puElasticInput'
])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .otherwise({
      redirectTo: '/index'
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
    maintainAspectRatio: true,
    responsive: true
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

.constant('formats', {
  time : 'H:MM',
  date : 'dd MMM yyyy',
  month : 'MMM yyyy',
  dateTime : 'dd MMM yyyy h:mm:ss a'
})

.config(function (uibDatepickerConfig, uibDatepickerPopupConfig, formats) {
    uibDatepickerConfig.showWeeks = false;
    uibDatepickerConfig.showButtonBar = false;
    uibDatepickerPopupConfig.showButtonBar = false;
    uibDatepickerPopupConfig.datepickerPopup = formats.date;
})

.config(function($httpProvider){
  var dateRegex = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(\.\d+)?([+-][0-2]\d(:?[0-5]\d)?|Z)$/;

  function recurseObject(object) {
    var result = object;
    if (object !== null) {
      result = angular.copy(object);
      for (var key in result) {
        var property = result[key];
        if (typeof property === 'object') {
          result[key] = recurseObject(property);
        } else if (typeof property === 'string' && dateRegex.test(property)) {
          result[key] = new Date(property);
        }
      }
    }
    return result;
  }

  $httpProvider.defaults.transformResponse = function(data) {
    try {
      var object;
      if (typeof data === 'object') {
        object = data;
      } else {
        object = JSON.parse(data);
      }
      return recurseObject(object);
    } catch(e) {
      return data;
    }
  };
})

.service('editMode', function() {
  this.editMode = false;

  this.toggle = function() {
    this.editMode = !this.editMode;
  };
});

;
