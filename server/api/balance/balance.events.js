/**
 * Balance model events
 */

'use strict';

import {EventEmitter} from 'events';
var Balance = require('./balance.model');
var BalanceEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BalanceEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Balance.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BalanceEvents.emit(event + ':' + doc._id, doc);
    BalanceEvents.emit(event, doc);
  }
}

export default BalanceEvents;
