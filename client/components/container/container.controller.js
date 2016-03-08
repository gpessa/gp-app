'use strict';

(function () {

  class ContainerController {

    constructor(socket, ContainerService) {
      this.socket = socket;
      this.ContainerService = ContainerService;
      this.sortableOption = {
        'stop' : () => {
          this.update();
        }
      };

      this.render();
    }

    render(){
      this.ContainerService
        .show( this.id )
        .then((widgetContainer) => {
          this.widgetContainer = widgetContainer;
          this.socket.syncUpdates('widget-container', this.widgetContainer);
        });
    }

    remove(){
      this.ContainerService.remove( this.widgetContainer , (widgetContainer) => {
        this.widgetContainer = widgetContainer;
      });
    }

    update(){
      this.ContainerService.update( this.widgetContainer , (widgetContainer) => {
          this.widgetContainer = widgetContainer;
      });
    }

    addWidget(widget){
      this.widgetContainer.widgets.push(widget);
      this.update();
    }


  }

  angular.module('gpAppApp')
         .controller('ContainerController', ContainerController);

})();
