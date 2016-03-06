'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PositiveThingSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  list : [{
    name : String
  }]
});

export default mongoose.model('PositiveThing', PositiveThingSchema);
