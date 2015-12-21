/**
 * WidgetContainer model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var WidgetContainer = require('./widget-container.model');
var WidgetContainerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WidgetContainerEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  WidgetContainer.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    WidgetContainerEvents.emit(event + ':' + doc._id, doc);
    WidgetContainerEvents.emit(event, doc);
  }
}

module.exports = WidgetContainerEvents;
