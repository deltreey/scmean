'use strict';

angular.module('scmeanApp')
  .service('Build', function ($resource) {
    return $resource('/api/v1/builds/');
  });
