'use strict';

angular.module('scmeanApp')
  .factory('User', function ($resource) {
    return $resource('/api/v1/users/:id/:controller/:details', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      upgrade: {
        method: 'GET',
        params: {
          controller: 'addrole',
          details: 'dev'
        }
      }
    });
  });
