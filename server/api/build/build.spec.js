'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Build = require('./build.model');

describe('GET /api/v1/builds', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/v1/builds')
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
