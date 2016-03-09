'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var WidgetSchema = new Schema({
  element : String,
  type : String,
  name : { type: String, default: 'Widget Name' },
  dimension : { type: Number, default: 6 },
  configuration : Object
},{
  toObject: {
    transform: function (doc, ret, game) {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Widget', WidgetSchema);
