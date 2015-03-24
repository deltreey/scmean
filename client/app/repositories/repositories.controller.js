'use strict';

angular.module('scmeanApp')
  .controller('RepositoriesCtrl', function ($scope, $http, Modal) {
    $scope.repositories = [];
    $scope.selectedRepository = 'None';
    $scope.createRepoDialog = function() {
        var createModal = Modal.input.createRepository(function(result) {
            console.log('Creating Repository: ' + result);
            $http.post('/api/v1/repositories', { name: result });
        });
        createModal();
    };
    $scope.deleteRepo = function() {
        var deleteModal = Modal.confirm.delete(function () {
            $http.delete('/api/v1/repositories/' + $scope.selectedRepository);
        });
        deleteModal($scope.selectedRepository);
    };
    $http.get('/api/v1/repositories')
        .success(function(data) {
            // this callback will be called asynchronously
            // when the response is available
            for (var d = 0; d < data.length; ++d) {
                $scope.repositories.push({
                    Name: data[d].name,
                    Url: {
                        Clone: data[d].url
                    }
                });
            }
        })
        .error(function(data) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('Error retrieving repositories.');
            console.error(data);
        });
  });
