'use strict';

import Item from '../item/item.model';
import mongoose from 'mongoose';
var Schema = mongoose.Schema;


var PageSchema = new Schema({
  "title" : String,
  "child" : {
    "type" : mongoose.Schema.Types.ObjectId,
    "ref" : 'Item'
  }
},{
  "toJSON" : {
    "virtuals" : true
  }
});

PageSchema
  .virtual('url')
  .get(function(){ return this.title.toLowerCase().replace(/ /g,"-"); });


var PagesSchema = new Schema({
  "user" : {
    "type" : mongoose.Schema.Types.ObjectId,
    "ref" : 'User'
  },
  "pages" : {
    "type" : [PageSchema],
    "default" : []
  }
},{
  "toJSON" : {
    "virtuals" : true
  }
});

export default mongoose.model('Pages', PagesSchema);
