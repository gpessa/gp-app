'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var WidgetSchema = new Schema({
  type : String,
  name : { type: String, default: 'Widget Name' },
  dimension : { type: Number, default: 6 },
  configuration : Object
});

module.exports = mongoose.model('Widget', WidgetSchema);
