/**
 * Child model events
 */

'use strict';

import {EventEmitter} from 'events';
var Child = require('./child.model');
var ChildEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ChildEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Child.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ChildEvents.emit(event + ':' + doc._id, doc);
    ChildEvents.emit(event, doc);
  }
}

export default ChildEvents;
