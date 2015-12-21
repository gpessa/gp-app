/**
 * Widget model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Widget = require('./widget.model');
var WidgetEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WidgetEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Widget.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    WidgetEvents.emit(event + ':' + doc._id, doc);
    WidgetEvents.emit(event, doc);
  }
}

module.exports = WidgetEvents;
