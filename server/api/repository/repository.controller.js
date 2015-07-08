/*jshint -W079*/
'use strict';

var _ = require('lodash'),
    Promise = require('promise'),
    exec = require('child_process').exec,
    fs = require('fs-extra'),
    path = require('path'),
    vsprintf = require("sprintf-js").vsprintf,
    async = require('async');
var config = require('../../config/environment');
var readDir = Promise.denodeify(fs.readdir);
var readFile = Promise.denodeify(fs.readFile);
var writeFile = Promise.denodeify(fs.writeFile);

var hookScript = '#!/bin/sh\n\n' +
                 'branch=$(git rev-parse --symbolic --abbrev-ref $1)\n' +
                 'if [branch = "master"]; then\n' +
                 '  curl http://%s/builds/%s/execute\n' +
                 'fi\n';

// Get list of repositories
exports.index = function(req, res) {
  readDir(config.git.directory)
    .then(function (files) {
      var result = [];
      for (var f = 0; f < files.length; ++f) {
        result.push({ name: files[f], url: 'git://' + config.url + '/' + files[f], location: '/git/' + files[f] });
      }

      return res.json(result);
    });
};

// Creates a new repository
exports.create = function(req, res) {
  var repoDir = path.join(config.git.directory, req.body.name);
  fs.ensureDirSync(repoDir);
  fs.chownSync(repoDir, config.git.uid, config.git.gid);
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


// Git Hooks: https://git-scm.com/book/ en/v2/Customizing-Git-Git-Hooks
exports.getHooks = function(req, res) {
  var repoDir = path.join(config.git.directory, req.params.repo);
  if (!fs.existsSync(repoDir)) { return res.send(404); }
  var hookDir = path.join(repoDir, 'hooks');
  readDir(hookDir)
    .then(function (files) {
      var result = [];
      async.each(files, function (file, callback) {
        if (!_.endsWith(file, '.sample')) {
          readFile(path.join(hookDir, file))
            .then(function (content) {
              result.push({
                name: file,
                command: content
              });
              callback();
            });
        }
        else {
          callback();
        }
      }, function (error) {
        if (error) { return handleError(res, error); }
        return res.json(result);
      });
    });
}

exports.createHook = function(req, res) {
  if (!req.body || !req.body.build || !req.body.name) {
    return handleError(res, new Error('Creating a hook requires a POST body with the build id and the hook name.'));
  }

  var repoDir = path.join(config.git.directory, req.params.repo);
  if (!fs.existsSync(repoDir)) { return res.send(404); }
  var hookDir = path.join(repoDir, 'hooks');
  fs.ensureDirSync(hookDir);
  fs.chownSync(repoDir, config.git.uid, config.git.gid);
  writeFile(path.join(hookDir, req.body.name), vsprintf(hookScript, [config.url, req.body.build]))
    .then(function () {
      return res.send(201);
    })
    .catch(function (error) {
      return handleError(res, error);
    });
};

exports.updateHook = function(req, res) {
  var repoDir = path.join(config.git.directory, req.params.repo);
  if (!fs.existsSync(repoDir)) { return res.send(404); }
  var hookDir = path.join(repoDir, 'hooks');
  var command = vsprintf('echo -e "%s" > %s', ['#!/bin/sh\\ntest data', 'test.txt']);
  res.send(200);
};

exports.destroyHook = function(req, res) {
  var repoDir = path.join(config.git.directory, req.params.repo);
  if (!fs.existsSync(repoDir)) { return res.send(404); }
  var hookDir = path.join(repoDir, 'hooks');
  fs.unlinkSync(path.join(hookDir, 'test.txt'));
  res.send(204);
};

function handleError(res, err) {
  console.error(err);
  return res.send(500, err);
}
