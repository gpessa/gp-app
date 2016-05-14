'use strict';

import mongoose from 'mongoose';

var SinglePageSchema = new mongoose.Schema({
  title : String,
  icon : String,
  child : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }
});

var PageSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pages : [SinglePageSchema]
});

SinglePageSchema
  .virtual('url')
  .get(() => { return this.title.toLowerCase().replace(/ /g,"-");});
  
export default mongoose.model('Page', PageSchema);
