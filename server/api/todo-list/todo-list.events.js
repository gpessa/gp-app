/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
var TodoList = require('./todo-list.model');
var TodoListEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TodoListEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TodoList.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  console.log('event1');
  return function(doc) {
    TodoListEvents.emit(event + ':' + doc._id, doc);
    TodoListEvents.emit(event, doc);
  }
}

export default TodoListEvents;
