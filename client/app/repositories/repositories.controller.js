'use strict';

angular.module('scmeanApp')
  .controller('RepositoriesCtrl', function ($scope, $http, Modal, Auth) {
    $scope.repositories = [];
    $scope.isAdmin = Auth.isAdmin;
    $scope.isDev = Auth.isDev;

    function UpdateRepositoryList() {
      $http.get('/api/v1/repositories')
        .success(function (data) {
          $scope.repositories = [];
          for (var d = 0; d < data.length; ++d) {
            $scope.repositories.push({
              Name: data[d].name,
              Url: {
                Clone: data[d].url
              }
            });
          }
        })
        .error(function (data) {
          console.log('Error retrieving repositories.');
          console.error(data);
        });
    }

    $scope.createRepoDialog = function() {
      var createModal = Modal.input.createRepository(function(result) {
        console.log('Creating Repository: ' + result);
        $http.post('/api/v1/repositories', { name: result })
          .success(function () {
            new UpdateRepositoryList();
          });
      });
      createModal();
    };
    
    $scope.deleteRepo = function(index) {
      var deleteModal = Modal.confirm.delete(function () {
        $http.delete('/api/v1/repositories/' + $scope.repositories[index].Name)
          .success(function () {
            new UpdateRepositoryList();
          });
      });
      deleteModal($scope.repositories[index].Name);
    };

    new UpdateRepositoryList();
  });
