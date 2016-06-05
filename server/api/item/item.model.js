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

var populateChildren = function(next) {
  this.populate('children');
  next();
};

var deleteChildren = function(model) {
  model.children.forEach(child => {
    child.remove();
  })

};

ItemSchema
  .post('remove', deleteChildren);

ItemSchema
  .pre('findOneAndUpdate', populateChildren)
  .pre('findOne', populateChildren)
  .pre('find', populateChildren)
  .pre('save', populateChildren)
  .post('update', populateChildren);

export default mongoose.model('Item', ItemSchema);
