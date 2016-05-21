'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var TodoListItemSchema = new Schema({
  name : { type: String, required: true, trim: true },
  archivied : { type: Boolean, default: false }
});

var TodoListSchema = new Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: { type: String },
  list: [TodoListItemSchema]
});

module.exports = mongoose.model('TodoList', TodoListSchema);
