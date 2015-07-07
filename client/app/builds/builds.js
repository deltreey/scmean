'use strict';

angular.module('scmeanApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/builds', {
        templateUrl: 'app/builds/builds.html',
        controller: 'BuildsCtrl'
      })
      .when('/builds/:id', {
      	templateUrl: 'app/builds/build.html',
      	controller: 'BuildCtrl'
      });
  });
