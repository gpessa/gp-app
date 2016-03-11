'use strict';

(function () {

  class ContainerController {

    constructor(socket, ContainerResource) {
      this.socket = socket;
      this.ContainerResource = ContainerResource;
      this.sortableOption = {
        'stop' : () => {
          this.update();
        }
      };
      this.get();
    }

    get(){
      this.container = this.ContainerResource.get({
        'id' : this.id
      });
    }

    linkChild(child, type){
      this.container.children.push(child);
      this.container.$update();
    }

    unlinkChild(child){
      this.container.children.remove(child);
      this.container.$update();
    }


  }

  angular.module('gpAppApp')
         .controller('ContainerController', ContainerController);

})();
