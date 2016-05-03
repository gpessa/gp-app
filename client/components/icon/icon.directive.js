'use strict';

angular
  .module('gpAppApp')

  .directive('icon', () => {
    return {
      'restrict': 'A',
      'link': function(scope, element, attr) {
        if (attr.icon) {
          element.prepend('<i class="fa-fw ' + attr.icon + '"></i>');
        }
      }
    };
  })
