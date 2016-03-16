'use strict';

(function () {

  var schema = {
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
  };

  var formcontrols = ['*', {
      type: 'submit',
      title: 'Save',
      style: 'btn btn-block btn-primary'
  }];

  class WidgetController {
    constructor(WidgetResource) {
      this.widget = new WidgetResource(this.widget);

      this.schema = angular.copy(schema);
      this.formcontrols = formcontrols;

      this.isWidgetLoading = false;
      this.isSettingsOpen = false;
    }

    addConfigurations(property){
      this.schema.properties.configuration = {
        'type' : 'object',
        'title' : 'Configuration',
        'properties': {}
      };
      angular.extend(this.schema.properties.configuration.properties, property);
    }

    getConfiguration() {
      return this.widget.configuration;
    }

    toggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen;
    };

    toggleLoading() {
      this.isWidgetLoading = !this.isWidgetLoading;
    };

    remove(){
      this.widget.$remove();
    }

    save(){
      this.widget.$save();
    }
  }

  angular.module('gpAppApp')
         .controller('WidgetController', WidgetController);

})();
