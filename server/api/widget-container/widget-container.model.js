'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var WidgetContainerSchema = new Schema({
  id: String,
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  widgets : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Widget'
  }]
},{
  toObject: {
    transform: function (doc, ret, game) {
      delete ret.user;
    }
  }
});

module.exports = mongoose.model('WidgetContainer', WidgetContainerSchema);
