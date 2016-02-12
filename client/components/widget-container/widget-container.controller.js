'use strict';

(function() {

  class WidgetContainerController {

    constructor(socket, WidgetContainerService) {
      this.socket = socket;
      this.WidgetContainerService = WidgetContainerService;
      this.sortableOption = {
        'handle' : '.widget-header',
        'stop' : this.updateWidgetContainer
      }

      this.renderWidgetContainer();
    }

    renderWidgetContainer(){
      this.WidgetContainerService
        .show( this.id )
        .then((widgetContainer) => {
          this.widgetContainer = widgetContainer;
          this.socket.syncUpdates('widget-container', this.widgetContainer);
        });
    };

    removeWidgetContainer(){
      this.WidgetContainerService.remove( this.widgetContainer , (widgetContainer) => {
        this.widgetContainer = widgetContainer;
      });
    };

    updateWidgetContainer(){
      this.WidgetContainerService.update( this.widgetContainer , (widgetContainer) => {
          this.widgetContainer = widgetContainer;
      });
    };

    addWidget(widget){
      this.widgetContainer.widgets.push(widget);
      this.updateWidgetContainer();
    };

    // return {
    //   'addWidget' : this.addWidget,
    //   'refreshContainer' : this.renderWidgetContainer
    // };


  }

  angular.module('gpAppApp')
         .controller('WidgetContainerController', WidgetContainerController);

})();
