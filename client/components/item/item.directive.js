
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

          let type = scope.$ctrl.model.type;
          let subtype = scope.$ctrl.model.subtype;

          var html = `<div class="${type}">\
                        <${type}-${subtype} class="${type}-${subtype}">\
                        </${type}-${subtype}>\
                      </div>`;

          var e = $compile(html)(scope);
          element.append(e);
        }
      }
    };
  });
