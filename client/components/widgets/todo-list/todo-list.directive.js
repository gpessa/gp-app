'use strict';

angular
  .module('gpAppApp')
  .directive('widgetTodoList', (socket, TodoListResource) => {
    return {
      'templateUrl': 'components/widgets/todo-list/todo-list.html',
      'require': '^^item',
      'restrict': 'C',
      'scope': true,
      'link': function(scope, element, attr, item) {

        scope.createItem = (todoList, todoListForm) => {
          if (todoListForm.$valid) {
            var newItem = angular.copy(todoList.newItem);
            delete todoList.newItem;

            todoList.list.push(newItem);
            todoList
              .$save()
              .then(scope.get);
          }
        };

        scope.deleteItem = (todoList, item) => {
          todoList.list.remove(item);
          todoList
            .$save();
        };

        scope.create = () => {
          var todoList = new TodoListResource({});
          todoList
            .$create()
            .then(scope.get);
        };

        scope.delete = (todoList) => {
          todoList
            .$remove()
            .then(scope.get);
        };

        scope.save = (todoList) => {
          todoList
            .$save();
        };

        scope.get = () => {
          item.toggleLoading();
          scope.todoLists = TodoListResource.query({}, () => item.toggleLoading());
        };

        scope.get();
      }
    };
  });
