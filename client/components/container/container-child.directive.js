'use strict';

angular
  .module('gpAppApp')
  .directive('containerChild', ($compile) => {
    return {
      'restrict' : 'E',
      'scope' : {
        'data' : '='
      },
      link : function(scope, element){
        var html ='<' + scope.data.element + ' data="data"></' + scope.data.element + '>';
        var e = $compile(html)(scope);
        element.replaceWith(e);
      }
    };
  });
