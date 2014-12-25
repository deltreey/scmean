'use strict';

var _ = require('lodash');
var Build = require('./build.model');

// Get list of builds
exports.index = function(req, res) {
  Build.find(function (err, builds) {
    if(err) { return handleError(res, err); }
    return res.json(200, builds);
  });
};

// Get a single build
exports.show = function(req, res) {
  Build.findById(req.params.id, function (err, build) {
    if(err) { return handleError(res, err); }
    if(!build) { return res.send(404); }
    return res.json(build);
  });
};

// Creates a new build in the DB.
exports.create = function(req, res) {
  Build.create(req.body, function(err, build) {
    if(err) { return handleError(res, err); }
    return res.json(201, build);
  });
};

// Updates an existing build in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Build.findById(req.params.id, function (err, build) {
    if (err) { return handleError(res, err); }
    if(!build) { return res.send(404); }
    var updated = _.merge(build, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, build);
    });
  });
};

// Deletes a build from the DB.
exports.destroy = function(req, res) {
  Build.findById(req.params.id, function (err, build) {
    if(err) { return handleError(res, err); }
    if(!build) { return res.send(404); }
    build.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}