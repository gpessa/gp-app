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

          scope.inserted = function(event, item, oldparent){
            console.log('inserted ')
            console.log(event, scope.item.model._id);
            scope.item.save();
          }

          scope.remove = function(event, child, oldparent){
            console.log('callback ' + scope.item.model._id + ' ' + oldparent._id)
          }


          scope.inserted = function(event, index, item){
            console.log('inserted');
            console.log(event, scope.item.model._id);
            // scope.item.model.children.push(item);
            scope.item.save();
            return item;
          }
          scope.drop = function(event, item){
            console.log('drop');
            // console.log(event, scope.item.model._id);
            // scope.item.model.children.push(item);
            scope.item.save();
            return item;
          }

          scope.moved = function(event){
            console.log('moved');
            console.log(event, scope.item.model._id);
          }

          scope.copied = function(event){
            console.log('copied');
            console.log(event, scope.item.model._id);
          }

          scope.dragend = function(event, item){
            console.log('dragend');
            console.log(event, scope.item.model._id);
            scope.item.model.children.remove(item);
            scope.item.save();
          }

        }
      }

    };
  });
