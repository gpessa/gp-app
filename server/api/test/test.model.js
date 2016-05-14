'use strict';

import mongoose from 'mongoose';

var TestSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Test', TestSchema);
