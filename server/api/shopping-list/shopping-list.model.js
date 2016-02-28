'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShoppingListSchema = new Schema({
  name: { type: String },
  lastupdate : Date,
  list: [{
    name : { type: String, required: true, trim: true },
    archivied : { type: Boolean, default: false }
  }]
});

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);
