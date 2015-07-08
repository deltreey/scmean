'use strict';

describe('Service: Build', function () {

  // load the service's module
  beforeEach(module('scmeanApp'));

  // instantiate service
  var Build;
  beforeEach(inject(function (_Build_) {
    Build = _Build_;
  }));

  it('should do something', function () {
    expect(!!Build).toBe(true);
  });

});
