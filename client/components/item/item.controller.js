'use strict';

(function () {

  var schema = {
    'type' : 'object',
    'properties' : {
        'attributes' : {
          'title' : 'Attributes',
          'type' : 'object',
          'properties' : {
            'name' : {
              'type'  : 'string',
              'title' : 'Name'
            },
            'dimension' : {
              'type'  : 'number',
              'title' : 'Dimension',
              'enum' : [1,2,3,4,5,6,7,8,9,10,11,12]
            }
          }
        }
    }
  };

  var formcontrols = ['*', {
      type: 'submit',
      title: 'Save',
      style: 'btn btn-block btn-primary'
  }];

  class ItemController {

    constructor(ItemResource) {
      this.model = new ItemResource(this.model);

      this.schema = angular.copy(schema);
      this.formcontrols = formcontrols;

      this.isItemLoading = false;
      this.isSettingsOpen = false;

      if(this.getmodel){
        this.get();
      }
    }

    addConfigurations(property){
      this.schema.properties.configuration = {
        'type' : 'object',
        'title' : 'Configuration',
        'properties': {}
      };
      angular.extend(this.schema.properties.configuration.properties, property);
    }

    toggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen;
    }

    toggleLoading() {
      this.isItemLoading = !this.isItemLoading;
    }

    saveSettings(form) {
      if (form.$valid) {
        this.model.$save();
        this.toggleSettings();
      }
    }

    get(){
      this.model.$get();
    }

    remove(){
      this.parent.model.children.remove(this.model);
      this.parent.save();
      this.model.$remove();
    }

    save(){
      this.model.$save();
    }
  }

  angular.module('gpAppApp')
         .controller('ItemController', ItemController);

})();
