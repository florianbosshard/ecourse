
app.controller('ActivitiesController', ['$http', '$scope', 'ActivityFactory', function($http, $scope, ActivityFactory) {
    // For some reason $resource won't work here, so went for $http.get()
    var getData = function(){
        $http.get('api/index.php/activities')
            .success(
                function(data, status, headers, config) {

                    $scope.activities = data;
                    $scope.activity = {};
                })
            .error(
                function(data, status, headers, config) {
                    $scope.activities = status;
                });
        }

     $scope.addActivity = function () {
        if(!$scope.activity){
            alert('Wie w&auml;re es, wenn du noch etwas in die Felder eingeben w&uuml;rdest? ;-)')
        }
        else{
            console.log($scope.activity);
            ActivityFactory.create($scope.activity);
            getData();
        }
    }

        $scope.deleteActivity = function (activityId){
            ActivityFactory.delete({"id": activityId});
            getData();
        }

        getData();

}]);