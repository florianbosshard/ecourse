var app = angular.module('ecourse.controllers', [
    'ng',
    'ngResource'   
]);

// Controller for root page
app.controller('IndexController', function($http, $scope) {
    // For some reason $resource won't work here, so went for $http.get()
    $http.get('api/index.php/participants')
        .success(
            function(data, status, headers, config) {
            
                $scope.participants = data;
            })
        .error(
            function(data, status, headers, config) {
            
                $scope.participants = status;
            });       
});

// Controller for root page
app.controller('ParticipantController', function($http, $scope, $routeParams) {
    var participantId = $routeParams.id;
    // For some reason $resource won't work here, so went for $http.get()
    $http.get('api/index.php/participant/view/'+ participantId)
        .success(
            function(data, status, headers, config) {
            
                $scope.participant = data;
            })
        .error(
            function(data, status, headers, config) {
            
                $scope.participant = status;
            });       
});