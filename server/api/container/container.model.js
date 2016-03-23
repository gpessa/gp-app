'use strict';

import * as base from '../../config/base.schema';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ContainerSchema = new base.BaseSchema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  children : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child'
  }],
  dimension : { type: Number },
},{
  toObject: {
    transform: function (doc, ret, game) {
      delete ret.user;
      delete ret.__v;
    }
  }
});

module.exports = base.Child.discriminator('Container', ContainerSchema); //module.exports = mongoose.model('Container', ContainerSchema);
