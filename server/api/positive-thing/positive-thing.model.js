'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var PositiveThingSchema = new Schema({
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
