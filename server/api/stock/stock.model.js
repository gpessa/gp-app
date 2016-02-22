'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var StockSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  symbol : String
});

export default mongoose.model('Stock', StockSchema);
