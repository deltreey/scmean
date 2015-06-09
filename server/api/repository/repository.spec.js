'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/v1/repositories', function() {

  it('should require authentication', function(done) {
    request(app)
      .get('/api/v1/repositories')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});