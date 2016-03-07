'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoListSchema = new Schema({
  name: { type: String },
  list: [{
    name : { type: String, required: true, trim: true },
    archivied : { type: Boolean, default: false }
  }]
});

module.exports = mongoose.model('TodoList', TodoListSchema);
