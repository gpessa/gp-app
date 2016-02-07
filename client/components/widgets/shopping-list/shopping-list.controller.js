'use strict';

(function() {

  class ShoppingListController {

    constructor($scope, socket, shoppingListService) {
      this.shoppingListService = shoppingListService;
      this.socket = socket;
      
      this.getLists();

      $scope.$on('$destroy', function () {
        this.socket.unsyncUpdates('shopping-list');
      });
    }

    addItem(shoppingList, shoppingListForm){
      if(shoppingListForm.$valid){
        var item = angular.copy(shoppingList.item);
        delete shoppingList.item;

        shoppingList.list.push(item);
        this.shoppingListService.update(shoppingList);
      }
    }

    archiveItem(shoppingList, index){
      shoppingList.list[index].archivied = !shoppingList.list[index].archivied;
      shoppingList.list.sort(function(a, b){
        return a.archivied > b.archivied;
      });
      this.shoppingListService.update(shoppingList);
    }

    createList(){
      this.shoppingListService.create();
    }

    deleteList(shoppingList){
      this.shoppingListService.remove(shoppingList);
    }

    saveList(shoppingList){
      this.shoppingListService.update(shoppingList);
    }

    getLists(){
      this.shoppingListService.get()
        .then((lists) => {
          this.shoppingLists = lists;
          this.socket.syncUpdates('shopping-list', 'this.shoppingLists');
        });
    }
  }

  angular.module('gpAppApp')
         .controller('ShoppingListController', ShoppingListController);

})();
