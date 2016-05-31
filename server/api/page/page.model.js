'use strict';

import Item from '../item/item.model';
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var SinglePageSchema = new Schema({
  title : String
},{
  "toJSON" : {
    "virtuals" : true,
    "transform" : function (doc, ret, game) {
      delete ret.user;
      delete ret.__v;
    }
  }
});

// SinglePageSchema
//   .virtual('id')
//   .get(function(){ return this.title.toLowerCase().replace(/ /g,"-"); });


mongoose.model('SinglePage', SinglePageSchema);

// SinglePageSchema
//   .pre('save', function(next) {
//     console.log('2');
//     console.log(this);
//
//     // if (!this.child) {
//     //   var item = new Item({
//     //     'type' : 'container',
//     //     'subtype' : 'base',
//     //     'children' : []
//     //   });
//     //   item.save();
//     //   this.child = item._id;
//     // }
//     next();
//   });

// var autoPopulateChildren = function(next) {
//   console.log('pop');
//   this.populate('child');
//   next();
// };
//
// SinglePageSchema
//   .pre('findOne', autoPopulateChildren)
//   .pre('find', autoPopulateChildren);
//
// SinglePageSchema
//   .set('toJSON', { virtuals: true });


var PageSchema = new Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pages : {
    type: [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'SinglePage'
    }],
    default: []
  }
},{
  "toJSON" : {
    "virtuals" : true,
    "transform" : function (doc, ret, game) {
      delete ret.user;
      delete ret.__v;
    }
  }
});

PageSchema.pre('save', function(next){
  console.log(1);
  console.log(this);
  next();
})

PageSchema.pre('validate', function(next){
  console.log(2);
  console.log(this);
  next();
})


// var autoPopulatePages = function(next) {
//   this.populate('pages.child');
//   next();
// };
//
// PageSchema
//   .pre('findOne', autoPopulatePages)
//   .pre('find', autoPopulatePages)

export default mongoose.model('Page', PageSchema);
