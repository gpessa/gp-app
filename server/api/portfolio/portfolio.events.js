/**
 * Portfolio model events
 */

'use strict';

import {EventEmitter} from 'events';
var Portfolio = require('./portfolio.model');
var PortfolioEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PortfolioEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Portfolio.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PortfolioEvents.emit(event + ':' + doc._id, doc);
    PortfolioEvents.emit(event, doc);
  }
}

export default PortfolioEvents;
