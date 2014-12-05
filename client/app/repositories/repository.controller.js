'use strict';

angular.module('scmeanApp')
  .controller('RepositoryCtrl', function ($scope, $http, $routeParams) {
    $scope.repository = {};
     $http.get('/api/v1/repositories/' + $routeParams.name)
        .success(function(data) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.repository = {
                Name: data._id,
                Owner: {
                    Name: 'Ted'
                },
                Description: 'This is a test repository',
                Url: {
                    Clone: 'git://git.git.git',
                    Display: '/repositories/Test'
                },
                Branches: [
                    'master',
                    'development'
                ],
                selectedBranch: 'master',
                commits: [{
                    id: '123abc',
                    message: 'I checked in stuff'
                },{
                    id: '124abc',
                    message: 'I checked in stuff'
                },{
                    id: '125abc',
                    message: 'I checked in stuff'
                },{
                    id: '126abc',
                    message: 'I checked in stuff'
                },{
                    id: '127abc',
                    message: 'I checked in stuff'
                },{
                    id: '128abc',
                    message: 'I checked in stuff'
                },{
                    id: '129abc',
                    message: 'I checked in stuff'
                },{
                    id: '130abc',
                    message: 'I checked in stuff'
                }]
            };
        })
        .error(function(data) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('Error retrieving repositories.');
            console.log(data);
        });
  });
