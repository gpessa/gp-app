'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import Item from './item.model';
import _ from 'lodash';

var ItemSchema = new mongoose.Schema({
  "type" : String,
  "subtype" : String,
  "children" : [{
    "type" : mongoose.Schema.Types.ObjectId,
    "ref" : 'Item',
    set: function(item){
      var item = new Item(item);
      item.save();
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
