'use strict';

(function () {

  var schema = {
      'type' : 'object',
      'properties' : {
          'dimension' : {
            'type'  : 'number',
            'title' : 'Dimension',
            'enum' : [1,2,3,4,5,6,7,8,9,10,11,12]
          }
      }
  };

  var formcontrols = ['*', {
      type: 'submit',
      title: 'Save',
      style: 'btn btn-block btn-primary'
  }];

  class ContainerController {

    constructor(ContainerResource) {
      this.container = new ContainerResource(this.container);

      this.schema = angular.copy(schema);
      this.formcontrols = formcontrols;

      this.sortableOption = {
        'allow_cross' : true,
        'update' : () => {
          debugger;
        },
        'stop' : (children, dropped_index) => {
          this.container.$save();
        }
      };

      this.get();
    }

    toggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen;
    };

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
