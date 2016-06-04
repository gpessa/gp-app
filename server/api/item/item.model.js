'use strict';

import Item from './item.model';
import _ from 'lodash';
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  "type" : String,
  "subtype" : String,
  "children" : [{
    "type" : mongoose.Schema.Types.ObjectId,
    "ref" : 'Item',
  }],
  "attributes" : {
    "dimension"  : { type: Number, default: 12 },
    "name"  : String
  },
  "configuration" : Object
},{
  "toObject" : {
    "transform" : function (doc, ret, game) {
      delete ret.user;
      delete ret.__v;
    }
  }
});

var autoPopulateChildren = function(next) {
  this.populate('children');
  next();
};

ItemSchema
  .pre('findOneAndUpdate', autoPopulateChildren)
  .pre('findOne', autoPopulateChildren)
  .pre('find', autoPopulateChildren)
  .pre('save', autoPopulateChildren)
  .post('update', autoPopulateChildren)

export default mongoose.model('Item', ItemSchema);
