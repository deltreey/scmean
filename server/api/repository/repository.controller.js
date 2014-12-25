'use strict';

var _ = require('lodash'),
    exec = require('child_process').exec,
    fs = require('fs-extra');
//Models
var Repository = require('./repository.model');
var config = require('../../config/environment');

exports.refs = function(req, res) {
  if (req.param('service') &&
    req.param('service') === 'git-receive-pack')
  {
    res.setHeader('Expires', 'Fri, 01 Jan 1980 00:00:00 GMT');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate');
    res.setHeader('Content-Type', 'application/x-git-receive-pack-advertisement');
    var gitDir = config.root + config.git.directory;
    var repoDir = gitDir + '/' + req.params.id + '.git';
    var command = 'git-receive-pack --stateless-rpc --advertise-refs ' + repoDir;
    exec(command, {
      cwd: repoDir 
    }, function(error, stdout, stderr) {
      if (error !== null) {
        return handleError(res, 'exec error: ' + error);
      }
      console.log(stdout);
      return res.json(200, stdout);
    });
  }
  else {
    return res.send(404);
  }
}

exports.recievePack = function(req, res) {
  if (req.param('service') &&
    req.param('service') === 'git-receive-pack')
  {
    res.setHeader('Expires', 'Fri, 01 Jan 1980 00:00:00 GMT');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate');
    res.setHeader('Content-Type', 'application/x-git-receive-pack-result');
    var gitDir = config.root + config.git.directory;
    var repoDir = gitDir + '/' + req.params.id + '.git';
    var command = 'git-receive-pack --stateless-rpc ' + repoDir;
    exec(command, {
      cwd: repoDir 
    }, function(error, stdout, stderr) {
      if (error !== null) {
        return handleError(res, 'exec error: ' + error);
      }
      console.log(stdout);
      return res.json(200, stdout);
    });
  }
  else {
    return res.send(404);
  }
}

exports.showBranch = function (req, res) {
  return res.json(404);
};

// Get list of repositories
exports.index = function(req, res) {
  Repository.find(function (err, repositories) {
    if(err) { return handleError(res, err); }
    return res.json(200, repositories);
  });
};

// Get a single repository
exports.show = function(req, res) {
  Repository.findById(req.params.id, function (err, repository) {
    if(err) { return handleError(res, err); }
    if(!repository) { return res.send(404); }
    return res.json(repository);
  });
};

// Creates a new repository in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  Repository.create(req.body, function(err, repository) {
    if(err) { return handleError(res, err); }
    var gitDir = config.root + config.git.directory;
    var repoDir = gitDir + '/' + req.body._id + '.git';
    fs.ensureDirSync(repoDir);
    var command = 'git init --bare';
    exec(command, {
      cwd: repoDir 
    }, function(error, stdout, stderr) {
      if (error !== null) {
        return handleError(res, 'exec error: ' + error);
      }
      console.log(stdout);
      return res.json(201, stdout);
    });
  });
};

// Updates an existing repository in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Repository.findById(req.params.id, function (err, repository) {
    if (err) { return handleError(res, err); }
    if(!repository) { return res.send(404); }
    var updated = _.merge(repository, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, repository);
    });
  });
};

// Deletes a repository from the DB.
exports.destroy = function(req, res) {
  Repository.findById(req.params.id, function (err, repository) {
    if(err) { return handleError(res, err); }
    if(!repository) { return res.send(404); }
    repository.remove(function(err) {
      if(err) { return handleError(res, err); }
      var gitDir = config.root + config.git.directory;
      var repoDir = gitDir + '/' + req.params.id + '.git';
      fs.remove(repoDir, function (error) {
        if (error) { return handleError(res, error); }
        return res.send(204);
      });
    });
  });
};

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}