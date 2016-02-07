'use strict';

angular.module('gpAppApp')
  .directive('shoppingListWidget', function (shoppingListService, socket) {
    return {
      templateUrl: 'components/widgets/shopping-list/shopping-list.html',
      restrict: 'EAC',
      link: function (scope) {

        scope.addItem = function(shoppingList, shoppingListForm){
          shoppingList.submitted = true;

          if(shoppingListForm.$valid){
            var item = angular.copy(shoppingList.item);
            delete shoppingList.item;

            shoppingList.list.push(item);
            shoppingListService.update(shoppingList);
          }
        };

        scope.archiveItem = function(shoppingList, index){
          shoppingList.list[index].archivied = !shoppingList.list[index].archivied;
          shoppingList.list.sort(function(a, b){
            return a.archivied > b.archivied;
          });

          shoppingListService.update(shoppingList);
        };

        scope.createList = function(){
          shoppingListService.create();
        };

        scope.deleteList = function(shoppingList){
          shoppingListService.remove(shoppingList);
        };

        scope.saveList = function(shoppingList){
          shoppingListService.update(shoppingList);
        };

        shoppingListService.get().then(function(lists){
          scope.shoppingLists = lists;
          socket.syncUpdates('shopping-list', function(){
            // debugger;
          });
        });

        scope.$on('$destroy', function () {
          socket.unsyncUpdates('shopping-list');
        });
      }
    };
  });
