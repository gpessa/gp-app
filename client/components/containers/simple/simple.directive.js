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


          scope.inserted = function(event, index, item){
            console.log('inserted');
            console.log(event, scope.item.model._id, item._id);
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
            scope.item.model.children.remove(angular.element(event.currentTarget).scope().child);
            scope.item.save();
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
