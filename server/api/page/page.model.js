'use strict';

import Item from '../item/item.model';
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var SinglePageSchema = new Schema({
  title : String,
  icon : String,
  child : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    default : function(){
      var item = new Item({
        'type' : 'container',
        'subtype' : 'base',
        'children' : []
      });
      item.save();
      return item;
    }
  }
});

SinglePageSchema
  .set('toJSON', { virtuals: true });

SinglePageSchema
  .virtual('url')
  .get(function(){ return this.title.toLowerCase().replace(/ /g,"-"); });


var PageSchema = new Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pages : {
    type: [SinglePageSchema],
    default: []
  }
});

export default mongoose.model('Page', PageSchema);
