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
        .then((container) => {
          this.container = container;
          this.socket.syncUpdates('widget-container', this.container);
        });
    }

    remove(){
      this.ContainerService.remove( this.container , (container) => {
        this.container = container;
      });
    }

    update(){
      this.ContainerService.update( this.container , (container) => {
        this.container = container;
      });
    }

    addWidget(widget){
      this.container.widgets.push(widget);
      this.update();
    }


  }

  angular.module('gpAppApp')
         .controller('ContainerController', ContainerController);

})();
