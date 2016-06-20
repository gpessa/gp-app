'use strict';

angular
  .module('gpAppApp')
  .constant('availableItems', {
    'Widget': [{
      'icon': 'fa fa-list',
      'type': 'widget',
      'subtype': 'todo-list',
      'attributes': {
        'name': 'Todo List'
      }
    }, {
      'icon': 'icon icon-cigarette',
      'type': 'widget',
      'subtype': 'cigarette',
      'attributes': {
        'name': 'Cigarette'
      }
    }, {
      'icon': 'fa fa-line-chart',
      'type': 'widget',
      'subtype': 'withings',
      'attributes': {
        'name': 'Withings'
      }
    }, {
      'icon': 'fa fa-sun-o',
      'type': 'widget',
      'subtype': 'buienradar',
      'attributes': {
        'name': 'Buienradar'
      }
    }, {
      'icon': 'fa fa-university',
      'type': 'widget',
      'subtype': 'stock',
      'attributes': {
        'name': 'Stocks'
      }
    }, {
      'icon': 'fa fa-exchange',
      'type': 'widget',
      'subtype': 'portfolio',
      'attributes': {
        'name': 'Portfolio'
      }
    }, {
      'icon': 'fa fa-line-chart',
      'type': 'widget',
      'subtype': 'balance',
      'attributes': {
        'name': 'Balance'
      }
    }, {
      'icon': 'fa fa-plus',
      'type': 'widget',
      'subtype': 'positive-thing',
      'attributes': {
        'name': 'Positive Thing'
      }
    }, {
      'icon': 'fa fa-sun-o',
      'type': 'widget',
      'subtype': 'forecast',
      'attributes': {
        'name': 'Forecast'
      }
    }],
    'Container': [{
      'hidden' : true,
      'icon': 'fa fa-square-o',
      'type': 'container',
      'subtype': 'simple',
      'attributes': {
        'name': 'Simple'
      }
    },{
      'icon': 'fa fa-columns',
      'type': 'container',
      'subtype': 'columns',
      'attributes': {
        'name': 'Columns'
      }
    }]
  });
