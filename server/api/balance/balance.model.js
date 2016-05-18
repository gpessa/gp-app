'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BalanceReportSchema  = new mongoose.Schema({
  saving : Number,
  current : Number,
  date : Date
});


BalanceReportSchema
  .set('toJSON', {
     virtuals: true
  });


BalanceReportSchema
  .virtual('total')
  .get(function() { return this.saving + this.current; });



var BalanceSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reports : {
    type: [BalanceReportSchema],
    default: []
  }
},{
  toObject: {
    transform: function (doc, ret, options) {
      delete ret.user;
    }
  }
});

export default mongoose.model('Balance', BalanceSchema);
