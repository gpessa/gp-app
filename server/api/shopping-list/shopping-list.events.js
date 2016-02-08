/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
var ShoppingList = require('./shopping-list.model');
var ShoppingListEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ShoppingListEvents.setMaxListeners(0);

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
  console.log('event1');
  return function(doc) {
    ShoppingListEvents.emit(event + ':' + doc._id, doc);
    ShoppingListEvents.emit(event, doc);
  }
}

export default ShoppingListEvents;
