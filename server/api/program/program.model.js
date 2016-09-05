'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
  name : { type: String, required: true, trim: true }
});

var ProgramSchema = new Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name : { type: String, trim: true },
  sets: [ExerciseSchema],
  active : { type: Boolean, defaukt: false },
});

module.exports = mongoose.model('Program', ProgramSchema);
