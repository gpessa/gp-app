/**
 * Thing model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var ShoppingList = require('./shopping-list.model');
var ShoppingListEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ShoppingList.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ShoppingList.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ShoppingListEvents.emit(event + ':' + doc._id, doc);
    ShoppingListEvents.emit(event, doc);
  }
}

module.exports = ShoppingListEvents;
