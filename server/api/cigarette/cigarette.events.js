/**
 * Cigarette model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Cigarette = require('./cigarette.model');
var CigaretteEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CigaretteEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Cigarette.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CigaretteEvents.emit(event + ':' + doc._id, doc);
    CigaretteEvents.emit(event, doc);
  }
}

module.exports = CigaretteEvents;
