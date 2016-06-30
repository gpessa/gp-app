'use strict';

(function() {

  class ItemController {

    constructor(ItemResource) {
      this.model = new ItemResource(this.model);

      this.isItemLoading = false;
      this.isSettingsOpen = false;
      this.schema = {
        'type': 'object',
        'properties': {
          'attributes': {
            'title': 'Attributes',
            'type': 'object',
            'properties': {
              'name': {
                'type': 'string',
                'title': 'Name'
              },
              'dimension': {
                'type': 'number',
                'title': 'Dimension',
                'enum': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
              }
            }
          }
        }
      };

      this.saveSettings = this.saveSettings.bind(this);
      this.toggleLoading = this.toggleLoading.bind(this);
    }

    addSettings(property) {
      this.schema.properties.settings = this.schema.properties.settings || {
        'type': 'object',
        'title': 'Settings',
        'properties': {}
      };
      angular.extend(this.schema.properties.settings.properties, property);
    }

    toggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen;
    }

    toggleLoading() {
      this.isItemLoading = !this.isItemLoading;
    }

    saveSettings() {
      this.toggleSettings();
      this.save();
    }

    remove() {
      this.parent.model.children.remove(this.model);
      this.parent.save();
      this.model.$remove();
    }

    save() {
      this.toggleLoading();
      this.model.$save().then(() => {
        this.toggleLoading();
      })
    }
  }

  angular
    .module('gpAppApp')
    .controller('ItemController', ItemController);

})();
