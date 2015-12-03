'use strict';

angular.module('gpAppApp')
  .directive('shoppingListWidget', function (shoppingListService, socket) {
    return {
      templateUrl: 'components/shopping-list/shopping-list.html',
      restrict: 'EAC',
      link: function (scope, element, attrs) {

        scope.addItem = function(shoppingList, shoppingListForm){
          shoppingList.submitted = true;

          if(shoppingListForm.$valid){
            var item = angular.copy(shoppingList.newItem);
            delete shoppingList.newItem;

            shoppingList.list.push(item);
            shoppingListService.update(shoppingList);
          }
        }

        scope.deleteItem = function(shoppingList, index){
          shoppingList.list.splice(index, 1);
          shoppingListService.update(shoppingList);
        }

        scope.createList = function(shoppingList){
          shoppingListService.create();
        }

        scope.deleteList = function(shoppingList){
          shoppingListService.remove(shoppingList);
        }
 
        scope.saveList = function(shoppingList){
          shoppingListService.update(shoppingList);
        }

        shoppingListService.get().then(function(lists){
          scope.shoppingLists = lists;
          socket.syncUpdates('shopping-list', scope.shoppingLists);
        })

        scope.$on('$destroy', function () {
          socket.unsyncUpdates('shopping-list');
        });
      }
    };
  });