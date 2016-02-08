/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ShoppingListEvents = require('./shopping-list.events');

// Model events to emit
var events = ['save', 'remove'];

exports.register = function(socket) {
  console.log('event4');
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('shopping-list:' + event, socket);

    ShoppingListEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
};


function createListener(event, socket) {
  console.log('event2');
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    ShoppingListEvents.removeListener(event, listener);
  };
}
