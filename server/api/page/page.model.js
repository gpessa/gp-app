'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PageSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pages : [{
    id: String,
    title : String,
    icon : String,
    child : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Child'
    }
  }]
});

export default mongoose.model('Page', PageSchema);
