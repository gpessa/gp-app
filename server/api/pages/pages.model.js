'use strict';

import Item from '../item/item.model';
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var PagesSchema = new Schema({
  "user" : {
    "type" : mongoose.Schema.Types.ObjectId,
    "ref" : 'User'
  },
  "pages" : {
    "type" : [{
      "type" : mongoose.Schema.Types.ObjectId,
      "ref" : 'Item',
    }],
    "default" : []
  }
},{
  "toJSON" : {
    "virtuals" : true
  }
});

var autoPopulatePages = function(next) {
  this.populate('pages');
  next();
};

PagesSchema
  .pre('findOneAndUpdate', autoPopulatePages)
  .pre('findOne', autoPopulatePages)
  .pre('find', autoPopulatePages)
  .pre('save', autoPopulatePages)
  .post('update', autoPopulatePages)

export default mongoose.model('Pages', PagesSchema);
