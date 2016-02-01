'use strict';

class WidgetContainerController {
  
  sortable_option = {
    "handle" : ".widget-header",
    "stop" : function(list, dropped_index){
      this.updateWidgetContainer();
    }
  };

  constructor(WidgetContainerService, socket) {
    this.WidgetContainerService = WidgetContainerService;
    this.socket = socket;
    this.showWidgetContainer();
    this.cane = '111111';
  }

  removeWidgetContainer(){
    this.WidgetContainerService.remove( this.widgetContainer , function(widgetContainer){
      this.widgetContainer = widgetContainer;
    });
  };

  updateWidgetContainer(){
    this.WidgetContainerService.update( this.widgetContainer , function(widgetContainer){
      this.widgetContainer = widgetContainer;
    });
  };

  showWidgetContainer(){
    this.WidgetContainerService.show( this.id )
      .then(function(widgetContainer){
        this.widgetContainer = widgetContainer;
        this.socket.syncUpdates('widget-container', this.widgetContainer); 
      }.bind(this))
      .catch(function(err) {
        this.WidgetContainerService.create(this.id, function(widgetContainer){
          this.widgetContainer = widgetContainer;
        });
      }.bind(this))
  }
  

  // return {
  //   updateWidgetContainer : this.updateWidgetContainer,
  //   showWidgetContainer : this.showWidgetContainer
  // }
} 

angular.module('gpAppApp')
       .controller('WidgetContainerController', WidgetContainerController);


