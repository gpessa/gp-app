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
//
// ItemSchema.pre('find', autoPopulateChildren);
// ItemSchema.pre('findOne', autoPopulateChildren)
// ItemSchema.pre('update', autoPopulateChildren)
// ItemSchema.pre('create', autoPopulateChildren)
// ItemSchema.pre('init', autoPopulateChildren)


// ItemSchema
//   .pre('findOneAndUpdate', function(next) {
//     // var toUpdate = this.children.length;
//     console.log('pre save');
//     console.log(this);
//     this.children = this.children.map(function(child){
//       return child._id;
//     })
//     console.log(this);
//
//     // this.children.forEach(function(child){
//     //   Item.findOneAndUpdate({_id : child._id}, {attributes : {dimension : child.attributes.dimension}}, function(){
//     //     toUpdate--;
//     //     console.log('update');
//     //     if(toUpdate == 0){
//     //       console.log('next');
//     //       this.populate('children');
//     //       // next();
//     //     }
//     //   })
//     //   next();
//     // });
//     next();
//   })
ItemSchema
  .pre('findOneAndUpdate', autoPopulateChildren)
  .pre('findOne', autoPopulateChildren)
  .pre('find', autoPopulateChildren)
  .pre('save', autoPopulateChildren)
  .post('update', autoPopulateChildren)

export default mongoose.model('Item', ItemSchema);
