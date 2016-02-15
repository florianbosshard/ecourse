app.controller('IndexController', function($http, $scope) {
    // For some reason $resource won't work here, so went for $http.get()
    $http.get('api/index.php/participants')
        .success(
            function(data, status, headers, config) {
                $scope.categories = data[0].categories;
                console.log($scope.categories);
                
                $scope.participants = data;
                angular.forEach($scope.participants, function (participant) {
                    participant.numBeobachtungen = parseFloat(participant.numBeobachtungen);
                    console.log(participant);
                });
            })
        .error(
            function(data, status, headers, config) {

                $scope.participants = status;
            });
});