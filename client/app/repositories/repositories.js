'use strict';

angular.module('scmeanApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/repositories', {
        templateUrl: 'app/repositories/repositories.html',
        controller: 'RepositoriesCtrl',
        caseInsensitiveMatch: true,
        authenticate: true
      })
      .when('/repositories/:name', {
      	templateUrl: 'app/repositories/repository.html',
      	controller: 'RepositoryCtrl',
      	caseInsensitiveMatch: true,
        authenticate: true
      })
      .when('/', {
        redirectTo: '/repositories'
      });
  });
