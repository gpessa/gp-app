'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BalanceSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reports : [{
    saving : Number,
    current : Number,
    date : Date
  }]
},{
  toObject: {
    transform: function (doc, ret, options) {
      delete ret.user;
    }
  }
});

export default mongoose.model('Balance', BalanceSchema);
