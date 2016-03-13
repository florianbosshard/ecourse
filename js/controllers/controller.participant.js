
// Controller for root page
app.controller('ParticipantController', function($http, $scope, $routeParams, BeobachtungFactory, $location) {
    var participantId = $routeParams.id;
    // For some reason $resource won't work here, so went for $http.get()
    var getData = function(){
        $http.get('api/index.php/participant/view/'+ participantId)
        .success(
            function(data, status, headers, config) {

                $scope.participant = data;
            })
        .error(
            function(data, status, headers, config) {

                $scope.participant = status;
            });
    };

    $scope.deleteBeobachtung = function (beobachtungId){

        BeobachtungFactory.delete({"id": beobachtungId});
        getData();
    }
    
    
    

    getData();
});
