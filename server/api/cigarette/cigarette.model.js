'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CigaretteSchema = new Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  days : [{
    date : Date,
    count : Number
  }]
},{
  toObject: {
    transform: function (doc, ret, options) {
      delete ret.user;
    }
  }
});

module.exports = mongoose.model('Cigarette', CigaretteSchema);
