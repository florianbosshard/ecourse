var app = angular.module('ecourse', ['ng', 'ngResource', 'ngRoute', 'ecourse.controllers', 'ecourse.services', 'pascalprecht.translate']);

app.config(function($routeProvider, $locationProvider, $translateProvider){
    $routeProvider
            .when('/', { templateUrl: 'views/index.html', controller: 'IndexController'})
            .when('/tabularView', {templateUrl: 'views/tabularView.html', controller: 'IndexController'})
            .when('/participants/view/:id', {templateUrl: 'views/participant-view.html', controller: "ParticipantController"})
            .when('/beobachtung/add/:id', {templateUrl: 'views/beobachtung-new.html', controller: "BeobachtungController"})
            .when('/beobachtung/modify/:id', {templateUrl: 'views/beobachtung-modify.html', controller: "BeobachtungModifyController"})
            .when('/activities/', {templateUrl: 'views/activities.html', controller: "ActivitiesController"})
            .when('/participants/', {templateUrl: 'views/participants.html', controller: "ParticipantsController"})
            .when('/stats/numBeobachtungenPerLeaderDay', {templateUrl: 'views/stats-numBeobachtungenPerLeaderDay.html', controller: "NumBeobachtungenPerLeaderDayController"})


    $translateProvider.useStaticFilesLoader({
        prefix: 'locales/locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('de');


});

