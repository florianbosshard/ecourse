var services = angular.module('ecourse.services', ['ngResource']);


services.factory('BeobachtungFactory', function($resource){
   return $resource('api/index.php/beobachtung/:id', {}, {
       create: {method: 'POST' },
       delete: {method: 'DELETE' },
       update: {method: 'PUT'}
   }) 
});

services.factory('ActivityFactory', function($resource){
   return $resource('api/index.php/activity/:id', {}, {
       create: {method: 'POST' },
       delete: {method: 'DELETE' }
   }) 
});

services.factory('ParticipantFactory', function($resource){
   return $resource('api/index.php/participant/:id', {}, {
       create: {method: 'POST' },
       delete: {method: 'DELETE' }
   }) 
});

/*services.factory('UsersFactory', function ($resource) {
    return $resource('/ngdemo/web/users', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('UserFactory', function ($resource) {
    return $resource('/ngdemo/web/users/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});*/