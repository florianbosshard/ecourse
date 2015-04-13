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

app.controller('BeobachtungController', ['$http', '$scope', 'BeobachtungFactory', '$routeParams', function($http, $scope, BeobachtungFactory, $routeParams){
    $scope.beobachtung = null;
    var participantId = $routeParams.id;
    
     $http.get('api/index.php/categories/')
        .success(
            function(data, status, headers, config) {
            
                $scope.categories = data;
            })
        .error(
            function(data, status, headers, config) {
            
                $scope.categories = status;
            });
    
    $scope.addBeobachtung = function () {
        console.log($scope);
        console.log(BeobachtungFactory);
        $scope.beobachtung.participantId = participantId; 
        BeobachtungFactory.create($scope.beobachtung)
        //UsersFactory.create($scope.user);
        //$location.path('/user-list');
    }
    
}]);

