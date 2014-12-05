'use strict';

angular.module('scmeanApp')
  .controller('RepositoriesCtrl', function ($scope, $http) {
    $scope.repositories = [];
    $http.get('/api/v1/repositories')
        .success(function(data) {
            // this callback will be called asynchronously
            // when the response is available
            for (var d = 0; d < data.length; ++d) {
                $scope.repositories.push({
                    Name: data[d]._id,
                    Owner: {
                        Name: 'Ted'
                    },
                    Description: 'This is a test repository',
                    Url: {
                        Clone: 'git://git.git.git',
                        Display: '/repositories/' + data[d]._id
                    }
                });
            }
        })
        .error(function(data) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('Error retrieving repositories.');
            console.log(data);
        });
  });
