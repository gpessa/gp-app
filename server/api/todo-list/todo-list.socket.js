/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var TodoListEvents = require('./todo-list.events');

// Model events to emit
var events = ['save', 'remove'];

exports.register = function(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('todo-list:' + event, socket);

    TodoListEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
};


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    TodoListEvents.removeListener(event, listener);
  };
}
