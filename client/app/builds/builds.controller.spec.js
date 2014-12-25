'use strict';

describe('Controller: BuildsCtrl', function () {

  // load the controller's module
  beforeEach(module('scmeanApp'));

  var BuildsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BuildsCtrl = $controller('BuildsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
