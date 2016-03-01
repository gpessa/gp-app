'use strict';

angular.module('gpAppApp').directive('shoppingListWidget', (socket, shoppingListService) => {
  return {
    'templateUrl' : 'components/widgets/shopping-list/shopping-list.html',
    'restrict' : 'C',
    'require' : '^^widget',
    'link' : function(scope, element, attr, widget) {
      scope.$on('$destroy', () => {
        socket.unsyncUpdates('shopping-list');
      });

      scope.createItem = function(shoppingList, shoppingListForm){
        if(shoppingListForm.$valid){
          var item = angular.copy(shoppingList.item);
          delete shoppingList.item;

          shoppingList.list.push(item);
          shoppingListService.update(shoppingList)
        }
      }

      scope.deleteItem = function(shoppingList, item){
        var index = shoppingList.list.indexOf(item);
        shoppingList.list.splice(index, 1);

        shoppingListService.update(shoppingList).then(scope.get);
      }

      scope.create = function(){
        shoppingListService.create().then(scope.get);
      }

      scope.delete = function(shoppingList){
        shoppingListService.remove(shoppingList).then(scope.get);
      }

      scope.update = function(shoppingList){
        shoppingListService.update(shoppingList);
      }

      scope.get = function(){
        widget.toggleLoading();
        shoppingListService.get()
          .then((lists) => {
            scope.shoppingLists = lists;
            socket.syncUpdates('shopping-list');
          })
          .finally(widget.toggleLoading);
      }

      scope.get();
    }
  };
});
