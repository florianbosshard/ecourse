var app = angular.module('ecourse', ['ng', 'ngResource', 'ngRoute', 'ecourse.controllers']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
            .when('/', { templateUrl: 'views/index.html', controller: 'IndexController'})
            .when('/participants/view/:id', {templateUrl: 'views/participant-view.html', controller: "ParticipantController"})
});

