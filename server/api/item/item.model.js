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
    set: function(item){
      if(!item._id){
        item = new Item(item);
        item.save();
      }
      return item;
    }
  }],
  "attributes" : {
    "dimension"  : { type: Number, default: 12 },
    "name"  : String
  },
  "configuration" : Object
},{
  validateBeforeSave: false,
  "toObject" : {
    "transform" : function (doc, ret, game) {
      delete ret.user;
      delete ret.__v;
    }
  }
});

export default mongoose.model('Item', ItemSchema);
