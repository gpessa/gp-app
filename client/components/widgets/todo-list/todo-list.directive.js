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

        scope.createItem = function(todoList, todoListForm) {
          if (todoListForm.$valid) {
            var newItem = angular.copy(todoList.newItem);
            delete todoList.newItem;

            todoList.list.push(newItem);
            todoList
              .$save()
              .then(scope.get);
          }
        };

        scope.deleteItem = function(todoList, item) {
          todoList.list.remove(item);
          todoList
            .$save();
        };

        scope.create = function() {
          var todoList = new TodoListResource({});
          todoList
            .$create()
            .then(scope.get);
        };

        scope.delete = function(todoList) {
          todoList
            .$remove()
            .then(scope.get);
        };

        scope.save = function(todoList) {
          todoList
            .$save();
        };

        scope.get = function() {
          item.toggleLoading();
          scope.todoLists = TodoListResource.query({}, () => item.toggleLoading());
        };

        scope.get();
      }
    };
  });
