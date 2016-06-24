
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

          var html ='<div><' + scope.$ctrl.model.type + ' model="$ctrl.model"></' + scope.$ctrl.model.type + '></div>';
          var e = $compile(html)(scope);

          element.append(e);

          // scope.$ctrl.parent = parent;
          //
          // var html ='<div class="' + scope.$ctrl.model.type + '-' + scope.$ctrl.model.subtype + '"></div>';
          // var e = $compile(html)(scope);
          //
          // element.append(e);
        }
      }
    };
  });
