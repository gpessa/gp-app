'use strict';

class WidgetContainerAddWidgetController {

  availablewidgets = [{
    'name' : 'Shopping List',
    'id' : 'shopping-list',
    'icon' : 'fa fa-shopping-cart'
  },{
    'name' : 'Cigarette',
    'id' : 'cigarette',
    'icon' : 'icon icon-cigarette'
  },{
    'name' : 'Withings',
    'id' : 'withings',
    'icon' : 'fa fa-line-chart'
  },{
    'name' : 'Buienradar',
    'id' : 'buienradar',
    'icon' : 'fa fa-sun-o'
  }];

  constructor() {
    //this.WidgetService = WidgetService;
  }
  
  // addWidget = function(widget){
  //   var widget = {
  //     'type' : widget.id
  //   };

  //   this.WidgetService.create(widget, function(widget){
  //     this.widgetContainer.widgets.push(widget);
  //     this.updateWidgetContainer();
  //   })
  // };
} 

angular.module('gpAppApp')
  .controller('WidgetContainerAddWidgetController', WidgetContainerAddWidgetController);


