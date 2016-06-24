'use strict';

angular
  .module('gpAppApp')
  .directive('wrapper', ($compile, editMode) => {
    return {
      'templateUrl' : 'components/wrapper/wrapper.html',
      'require' : '^^item',
      'restrict' : 'C',
      'link' : function(scope, element, attr, item){
        scope.editMode = editMode;
        scope.item = item;

        var wrapperBody = element.addClass('wrapper-' + item.model.subtype);
        $compile(wrapperBody)(scope);
      }
    };
  });
