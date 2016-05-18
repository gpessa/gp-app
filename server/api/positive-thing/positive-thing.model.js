'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PositiveThingSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: { type: Date, default: Date.now },
  list : [{
    name : String
  }]
});

export default mongoose.model('PositiveThing', PositiveThingSchema);
