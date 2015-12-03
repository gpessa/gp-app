'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CigaretteSchema = new Schema({
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cigarette', CigaretteSchema);
