
'use strict';

angular
  .module('gpAppApp')
  .directive('item', ($compile) => {
    return {
      'controller'  : 'ItemController',
      'bindToController' : {
        'model' : '=',
        'getmodel' : '='
      },
      'controllerAs' : '$ctrl',
      'restrict' : 'E',
      'scope' : {},
      'require' : '^^?item',
      link : function(scope, element, attrs, parent){
        scope.$ctrl.parent = parent;
        
        var html ='<' + scope.$ctrl.model.type + ' model="$ctrl.model"></' + scope.$ctrl.model.type + '>';
        var e = $compile(html)(scope);

        element.append(e);
      }
    };
  });
