'use strict';

angular.module('scmeanApp')
  .controller('RepositoryCtrl', function ($scope, $http, $routeParams, Modal) {
    $scope.repository = $routeParams.name;
    $scope.hooks = [];

    function UpdateHookList() {
      $http.get('/api/v1/repositories/' + $routeParams.name + '/hooks')
        .success(function(data) {
          $scope.hooks = data;
        })
        .error(function(data) {
          console.log('Error retrieving repositories.');
          console.log(data);
        });
    }

    $scope.createHookDialog = function() {
      var createModal = Modal.input.createHook(function(result, build, selectedBranch) {
        $scope.createHook(result, build, selectedBranch);
      });
      createModal();
    };

    $scope.createHook = function(name, build, branch) {
      $http.post(
        '/api/v1/repositories/' + $routeParams.name + '/hooks',
        { name: name, build: build, branch: branch }
        )
        .success(function () {
          new UpdateHookList();
        })
        .error(function (data) {
          console.log('Error creating hook.');
          console.error(data);
        });
    };

    $scope.updateHook = function(hook) {
      $http.put('/api/v1/repositories/' + $routeParams.name + '/hooks/' + hook.name, hook)
        .success(function () {
          console.log('Saved!');
        })
        .error(function (data) {
          console.log('Error saving hook');
          console.error(data);
        });
    };

    $scope.deleteHook = function (id) {
      $http.delete('/api/v1/repositories/' + $routeParams.name + '/hooks/' + id)
        .success(function () {
          new UpdateHookList();
        });
    };

    new UpdateHookList();
  });
