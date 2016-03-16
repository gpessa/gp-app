'use strict';

(function () {

  class ContainerController {

    constructor(ContainerResource) {
      this.container = new ContainerResource(this.container);

      this.sortableOption = {
        'stop' : () => {
          this.container.$save();
        }
      };

      this.get();
    }

    get(){
      this.container.$get();
    }

    linkChild(child){
      this.container.children.push(child);
      this.container.$save();
    }

    unlinkChild(child){
      this.container.children.remove(child);
      this.container.$save();
    }

    remove(){
      this.container.$remove();
    }

    save(){
      this.container.$save();
    }

  }

  angular.module('gpAppApp')
         .controller('ContainerController', ContainerController);

})();
