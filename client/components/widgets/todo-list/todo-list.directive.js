'use strict';

angular
  .module('gpAppApp')
  .directive('widgetTodoList', (socket, todoListService) => {
    return {
      'templateUrl' : 'components/widgets/todo-list/todo-list.html',
      'require' : '^^widget',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function(scope, element, attr, widget) {
        scope.$on('$destroy', () => {
          socket.unsyncUpdates('todo-list');
        });

        scope.createItem = function(todoList, todoListForm){
          if(todoListForm.$valid){
            var item = angular.copy(todoList.item);
            delete todoList.item;

            todoList.list.push(item);
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
          widget.toggleLoading();
          todoListService.get()
            .then((lists) => {
              scope.todoLists = lists;
              socket.syncUpdates('todo-list');
            })
            .finally(() => widget.toggleLoading());
        };

        scope.get();
      }
    };
  });
