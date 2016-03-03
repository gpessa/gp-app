'use strict';

(function () {

  class WidgetContainerController {

    constructor(socket, WidgetContainerService) {
      this.socket = socket;
      this.WidgetContainerService = WidgetContainerService;
      this.sortableOption = {
        'stop' : () => {
          this.update();
        }
      };

      this.render();
    }

    render(){
      this.WidgetContainerService
        .show( this.id )
        .then((widgetContainer) => {
          this.widgetContainer = widgetContainer;
          this.socket.syncUpdates('widget-container', this.widgetContainer);
        });
    }

    remove(){
      this.WidgetContainerService.remove( this.widgetContainer , (widgetContainer) => {
        this.widgetContainer = widgetContainer;
      });
    }

    update(){
      this.WidgetContainerService.update( this.widgetContainer , (widgetContainer) => {
          this.widgetContainer = widgetContainer;
      });
    }

    addWidget(widget){
      this.widgetContainer.widgets.push(widget);
      this.update();
    }


  }

  angular.module('gpAppApp')
         .controller('WidgetContainerController', WidgetContainerController);

})();
