'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PortfolioSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name : String,
  recap : Object,
  transactions : [{
    date : Date,
    buyprice: Number,
    sellprice: Number,
    marketprice: Number,
    quantity : Number,
    symbol : String,
    txcost : Number,
    operation : String,
    delta : Number,
    total : Number,
    value : Number,
    status : String
  }]
});

export default mongoose.model('Portfolio', PortfolioSchema);
