'use strict';

angular.module('scmeanApp')
  .controller('BuildCtrl', function ($scope, $http, $routeParams, Auth) {
  	$scope.build = {};
    $scope.isAdmin = Auth.isAdmin;
    $scope.isDev = Auth.isDev;
  	$scope.output = '';
  	$scope.error = '';

  	function GetBuild() {
  		$http.get('/api/v1/builds/' + $routeParams.id)
  			.success(function (data) {
  				$scope.build = data;
  			})
  			.error(function (data) {
  				console.log('Error retrieving build ' + $routeParams.id);
  				console.error(data);
  			});
  	}

  	$scope.UpdateBuild = function() {
  		$http.put('/api/v1/builds/' + $routeParams.id, $scope.build)
  			.success(function () {
  				console.log('Saved!');
  			})
  			.error(function (data) {
  				console.log('Error saving build');
  				console.error(data);
  			});
  	};

  	$scope.TestBuild = function() {
  		$http.get('/api/v1/builds/' + $routeParams.id + '/execute')
  			.success(function (data) {
  				$scope.output = data.out;
  				$scope.error = data.err;
  			})
  			.error(function (data) {
  				console.log('Error executing build');
  				console.error(data);
  			});
  	};

  	new GetBuild();
});
