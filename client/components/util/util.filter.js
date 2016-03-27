'use strict';

angular
  .module('gpAppApp')

  .filter('capitalize', function() {
    return function(str) {
      var pieces = str.toLowerCase().split(' ');
      for ( var i = 0; i < pieces.length; i++ ){
          var j = pieces[i].charAt(0).toUpperCase();
          pieces[i] = j + pieces[i].substr(1);
      }
      return pieces.join(' ');
    };
  }) 


  .filter('offset', function() {
    return function(input, start) {
      start = parseInt(start, 10);
      return input.slice(start);
    };
  });
