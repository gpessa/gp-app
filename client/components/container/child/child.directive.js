'use strict';

angular
  .module('gpAppApp')
  .directive('child', ($compile) => {
    return {
      'restrict' : 'E',
      'scope' : {
        'data' : '='
      },
      replace : true,
      link : function(scope, element){
        var html ='<' + scope.data.__t + ' data="data"></' + scope.data.__t + '>';
        var e = $compile(html)(scope);
        element.append(e);
      }
    };
  });
