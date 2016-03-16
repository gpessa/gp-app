'use strict';

import * as base from '../../config/base.schema';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var WidgetSchema = new base.BaseSchema({
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


module.exports = base.Child.discriminator('Widget', WidgetSchema);//mongoose.model('Widget', WidgetSchema);
