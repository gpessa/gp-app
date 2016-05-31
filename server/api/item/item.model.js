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
    "set" : function(item){
      // console.log('-----');
      // console.log(item);
      // console.log('-----');

      if(!item._id){
        // console.log('creo');

        item = new Item(item);
        item.save();

        // console.log(item);
        // console.log('-----');
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
  "toObject" : {
    "transform" : function (doc, ret, game) {
      delete ret.user;
      delete ret.__v;
    }
  }
});

var autoPopulateChildren = function(next) {
  // console.log('populate');
  // console.log(this);
  this.populate('children');
  next();
};

ItemSchema
  .pre('save', function(next) {
    var toUpdate = this.children.length;
    console.log('pre save');
    this.children.forEach(function(child){
      Item.findOneAndUpdate({_id : child._id}, {attributes : {dimension : child.attributes.dimension}}, function(){
        toUpdate--;
        console.log('update');
        if(toUpdate == 0){
          console.log('next');
          this.populate('children');
          // next();
        }
      })
      next();
    });
  })
  .pre('findOneAndUpdate', autoPopulateChildren)
  .pre('findOne', autoPopulateChildren)
  .pre('find', autoPopulateChildren)
  .pre('save', autoPopulateChildren)
  // .post('update', autoPopulateChildren)


export default mongoose.model('Item', ItemSchema);
