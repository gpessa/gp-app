'use strict';

angular
  .module('gpAppApp')
  .directive('containerChild', ($compile) => {
    return {
      'restrict' : 'E',
      'scope' : {
        'child' : '=data'
      },
      replace : true,
      link : function(scope, element){
        var html ='<' + scope.child.__t + ' data="child"></' + scope.child.__t + '>';
        var e = $compile(html)(scope);
        element.append(e);
      }
    };
  });
