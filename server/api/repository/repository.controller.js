/*jshint -W079*/
'use strict';

var _ = require('lodash'),
    Promise = require('promise'),
    exec = require('child_process').exec,
    fs = require('fs-extra'),
    path = require('path');
var config = require('../../config/environment');
var readDir = Promise.denodeify(fs.readdir);

// Get list of repositories
exports.index = function(req, res) {
  readDir(config.git.directory)
    .then(function (files) {
      var result = [];
      for (var f = 0; f < files.length; ++f) {
        result.push({ name: files[f], url: 'git://honeycomb.hive/' + files[f], location: '/git/' + files[f] });
      }

      return res.json(result);
    });
};

// Creates a new repository
exports.create = function(req, res) {
  var repoDir = path.join(config.git.directory, req.body.name);
  fs.ensureDirSync(repoDir);
  fs.chownSync(repoDir, config.git.uid, config.git.gid)
  var command = 'su -c "git init --bare --share" git';
  exec(command, { cwd: repoDir }, function(error, stdout, stderr) {
    if (error || stderr) {
      return handleError(res, 'exec error: ' + stderr);
    }
    console.log(stdout);
    return res.json(201, stdout);
  });
};

// Deletes a repository
exports.destroy = function(req, res) {
  var repoDir = config.git.directory + '/' + req.params.id;
  if (fs.existsSync(repoDir)) {
    fs.remove(repoDir, function (error) {
      if (error) { return handleError(res, error); }
      return res.send(204);
    });
  }
};

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}