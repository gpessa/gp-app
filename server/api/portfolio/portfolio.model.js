'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var PortfolioSchema = new Schema({
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
