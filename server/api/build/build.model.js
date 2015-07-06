'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BuildSchema = new Schema({
  name: String,
  command: String,
  workingdirectory: String,
  active: Boolean
});

module.exports = mongoose.model('Build', BuildSchema);
