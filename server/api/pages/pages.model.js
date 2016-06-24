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
    "transform" : function (doc, ret, game) {
      delete ret.user;
      delete ret.__v;
      ret.pages = ret.pages.map((page) => {
        page.status = page.attributes.name.toLowerCase().replace(/ /g, '+');
        return page;
      })
    }
  }
});

var autoPopulatePages = function(next) {
  this.populate('pages');
  next();
};

PagesSchema
  .pre('findOneAndUpdate', autoPopulatePages)
  .pre('findById', autoPopulatePages)
  .pre('findOne', autoPopulatePages)
  .pre('find', autoPopulatePages)
  .pre('save', autoPopulatePages)
  .post('update', autoPopulatePages)

export default mongoose.model('Pages', PagesSchema);
