'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var WidgetContainerSchema = new Schema({
  _id: String,
  widgets : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Widget'
  }]
});

module.exports = mongoose.model('WidgetContainer', WidgetContainerSchema);