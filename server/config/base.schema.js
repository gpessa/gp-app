'use strict'

import util from 'util';
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

export function BaseSchema() {
  Schema.apply(this, arguments);

  this.add({
    "type": String
  });
}

util.inherits(BaseSchema, Schema);

var ChildSchema = new BaseSchema();
var Child = mongoose.model("Child", ChildSchema);

exports.Child = Child;
exports.ChildSchema = ChildSchema;
