'use strict';

angular
  .module('gpAppApp')
  .directive('containerSimple', (editMode) => {
    return {
      'templateUrl' : 'components/containers/simple/simple.html',
      'require' : '^^item',
      'restrict' : 'C',
      'replace' : true,
      'link' : {
        post : function(scope, element, attr, item){
          scope.item = item;
          scope.editMode = editMode;

          scope.inserted = function(event, index, item, oldparent){
            console.log('inserted ' + scope.item.model._id)
            scope.item.save();
          }

          scope.remove = function(event, index, child, oldparent){
            console.log('callback ' + scope.item.model._id + ' ' + oldparent._id)
          }
        }
      }

    };
  });
