'use strict';

angular
  .module('gpAppApp')
  .directive('widgetTodoList', (socket, todoListService) => {
    return {
      'templateUrl' : 'components/widgets/todo-list/todo-list.html',
      'require' : '^^item',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function(scope, element, attr, item) {
        scope.createItem = function(todoList, todoListForm){
          if(todoListForm.$valid){
            var newItem = angular.copy(todoList.newItem);
            delete todoList.newItem;

            todoList.list.push(newItem);
            todoListService.update(todoList);
          }
        };

        scope.deleteItem = function(todoList, item){
          todoList.list.remove(item);
          todoListService.update(todoList).then(scope.get);
        };

        scope.create = function(){
          todoListService.create().then(scope.get);
        };

        scope.delete = function(todoList){
          todoListService.remove(todoList).then(scope.get);
        };

        scope.update = function(todoList){
          todoListService.update(todoList);
        };

        scope.get = function(){
          item.toggleLoading();
          todoListService
            .get()
            .then((lists) => {
              scope.todoLists = lists;
              socket.syncUpdates('todo-list');
            })
            .finally(() => item.toggleLoading());
        };

        scope.get();
      }
    };
  });
