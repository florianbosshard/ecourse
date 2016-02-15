app.controller('ParticipantsController', ['$http', '$scope', 'ParticipantFactory', function($http, $scope, ParticipantFactory) {
    // For some reason $resource won't work here, so went for $http.get()
    var getData = function(){
        $http.get('api/index.php/participants')
            .success(
                function(data, status, headers, config) {

                    $scope.participants = data;
                })
            .error(
                function(data, status, headers, config) {
                    $scope.participants = status;
                });
    }

     $scope.addParticipant = function () {
         alert('fehlt noch...');
    }

    $scope.editParticipant = function () {
         alert('fehlt noch...');
    }

    $scope.deleteParticipant = function (activityId){
        alert('fehlt noch');
        getData();
    }

    getData();

}]);