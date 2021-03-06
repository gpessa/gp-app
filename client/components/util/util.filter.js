'use strict';

angular
  .module('gpAppApp')
  .filter('capitalize', function() {
    return function(str) {
      str = str || '';
      var pieces = str.toLowerCase().split(' ');
      for (var i = 0; i < pieces.length; i++) {
        var j = pieces[i].charAt(0).toUpperCase();
        pieces[i] = j + pieces[i].substr(1);
      }
      return pieces.join(' ');
    };
  });
