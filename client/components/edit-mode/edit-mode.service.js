'use strict';

angular
  .module('gpAppApp')
  .service('editMode', function() {
    this.enabled = false;

    this.toggle = function() {
      this.enabled = !this.enabled;
    };
  });
