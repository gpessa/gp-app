'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// var ShoppingListItemSchema = new Schema({
//   active: Boolean,
//   name : String
// });

// module.exports = mongoose.model('ShoppingListItem', ShoppingListItemSchema);

var ShoppingListSchema = new Schema({
  name: { type: String, default: 'Supermarket' },
  lastupdate : Date,
  list: [{ 
    category : { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
    price : {type: Number, required: true }
  }]
});

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);