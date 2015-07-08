'use strict';

angular.module('scmeanApp')
  .controller('BuildsCtrl', function ($scope, $http, $location, Auth) {
    $scope.builds = [];
    $scope.isAdmin = Auth.isAdmin;
    $scope.isDev = Auth.isDev;

    function UpdateBuildList() {
      $http.get('/api/v1/builds')
        .success(function (data) {
          $scope.builds = [];
          for (var d = 0; d < data.length; ++d) {
            $scope.builds.push({
              Name: data[d].name,
              Active: data[d].active,
              _id: data[d]._id
            });
          }
        })
        .error(function (data) {
          console.log('Error retrieving builds.');
          console.error(data);
        });
    }


    $scope.deleteBuild = function (id) {
    	$http.delete('/api/v1/builds/' + id)
    		.success(function () {
          new UpdateBuildList();
        });
    };

    $scope.createBuild = function() {
    	$http.post('/api/v1/builds', { active: true })
    		.success(function (data) {
    			$location.url('/builds/' + data._id);
    		})
    		.error(function (data) {
    			console.log('Error creating build.');
    			console.error(data);
    		});
    };

    new UpdateBuildList();
  });
