'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var StockSchema = new Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  symbol : String,
  date : Date
});

export default mongoose.model('Stock', StockSchema);
