'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShoppingListSchema = new Schema({
  name: { type: String, default: 'Supermarket' },
  lastupdate : Date,
  list: [{ 
    name : { type: String, required: true, trim: true },
  }]
});

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);