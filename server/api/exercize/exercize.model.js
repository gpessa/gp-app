'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
  name : { type: String, required: true, trim: true }
});

module.exports = mongoose.model('Exercize', ExerciseSchema);
