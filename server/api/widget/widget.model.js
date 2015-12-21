'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var WidgetSchema = new Schema({
  type : String,
  configuration : Object
});

module.exports = mongoose.model('Widget', WidgetSchema);
