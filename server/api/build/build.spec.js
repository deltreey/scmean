'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/environment');
var Build = require('./build.model'),
    User = require('../user/user.model');

describe('Build Tests', function() {
  var token = '';
  before(function (done) {
    User.create({
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, function (error, user) {
      if (error) { return done(error); }
      token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 1 });
      done();
    });
  });

  after(function (done) {
    User.find({}).remove(function (error) {
      done(error);
    });
  });

  describe('GET /api/v1/builds', function() {
    it('should respond with JSON array', function(done) {
      request(app)
        .get('/api/v1/builds')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });
  });

  describe('GET /api/v1/builds/:id/execute', function() {
    var buildId;
    beforeEach(function (done) {
      Build.create({
        name: 'Test Build',
        command: 'dir',
        workingdirectory: '/',
        active: true
      }, function (error, build) {
        buildId = build._id;
        done();
      });
    });

    afterEach(function (done) {
      Build.remove({}, function () {
        done();
      });
    });

    it('should execute some code', function(done) {
      request(app)
        .get('/api/v1/builds/' + buildId + '/execute')
        .set('Authorization', 'Bearer ' + token)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.should.have.property('err').with.lengthOf(0);
          res.body.should.have.property('out').with.not.lengthOf(0);
          done();
        });
    });
  });
});
