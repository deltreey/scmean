'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RepositorySchema = new Schema({
  _id: String
});

module.exports = mongoose.model('Repository', RepositorySchema);