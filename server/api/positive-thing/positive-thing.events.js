/**
 * PositiveThing model events
 */

'use strict';

import {EventEmitter} from 'events';
var PositiveThing = require('./positive-thing.model');
var PositiveThingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PositiveThingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  PositiveThing.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PositiveThingEvents.emit(event + ':' + doc._id, doc);
    PositiveThingEvents.emit(event, doc);
  }
}

export default PositiveThingEvents;
