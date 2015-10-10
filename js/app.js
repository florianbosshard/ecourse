var app = angular.module('ecourse', ['ng', 'ngResource', 'ngRoute', 'ecourse.controllers', 'ecourse.services']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
            .when('/', { templateUrl: 'views/index.html', controller: 'IndexController'})
            .when('/participants/view/:id', {templateUrl: 'views/participant-view.html', controller: "ParticipantController"})
            .when('/beobachtung/add/:id', {templateUrl: 'views/beobachtung-new.html', controller: "BeobachtungController"})
            .when('/activities/', {templateUrl: 'views/activities.html', controller: "ActivitiesController"})
});

