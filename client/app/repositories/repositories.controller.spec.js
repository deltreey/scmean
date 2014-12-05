'use strict';

describe('Controller: RepositoriesCtrl', function () {

  // load the controller's module
  beforeEach(module('scmeanApp'));

  var RepositoriesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RepositoriesCtrl = $controller('RepositoriesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
