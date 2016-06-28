
'use strict';

angular
  .module('gpAppApp')
  .directive('item', ($compile) => {
    return {
      'controller'  : 'ItemController',
      'bindToController' : {
        'model' : '='
      },
      'controllerAs' : '$ctrl',
      'restrict' : 'E',
      'scope' : {},
      'require' : '^^?item',
      'link' :{
        pre : function(scope, element, attrs, parent){
          scope.$ctrl.parent = parent;
          var html = '<div class="' + scope.$ctrl.model.type + '"><div class="' + scope.$ctrl.model.type + '-' + scope.$ctrl.model.subtype + '"></div></div>';
          var e = $compile(html)(scope);
          element.append(e);
        }
      }
    };
  });
