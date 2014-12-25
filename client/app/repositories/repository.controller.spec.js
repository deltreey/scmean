'use strict';

describe('Controller: RepositoryCtrl', function () {

  // load the controller's module
  beforeEach(module('scmeanApp'));

  var RepositoriesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RepositoriesCtrl = $controller('RepositoryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
