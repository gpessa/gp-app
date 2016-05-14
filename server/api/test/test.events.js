/**
 * Test model events
 */

'use strict';

import {EventEmitter} from 'events';
import Test from './test.model';
var TestEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TestEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Test.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TestEvents.emit(event + ':' + doc._id, doc);
    TestEvents.emit(event, doc);
  }
}

export default TestEvents;
