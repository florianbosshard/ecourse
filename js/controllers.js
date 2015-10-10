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

app.controller('BeobachtungController', ['$http', '$scope', 'BeobachtungFactory', '$routeParams', '$location', function($http, $scope, BeobachtungFactory, $routeParams, $location){
    $scope.beobachtung = null;
    var participantId = $routeParams.id;

    
    $http.get('api/index.php/days/')
   .success(
       function(data, status, headers, config) {

           $scope.days = data;
       })
   .error(
       function(data, status, headers, config) {

           $scope.days = status;
       });
    
    
    
    
     $http.get('api/index.php/categories/')
        .success(
            function(data, status, headers, config) {
            
                $scope.categories = data;
            })
        .error(
            function(data, status, headers, config) {
            
                $scope.categories = status;
            });
    $scope.timeDisabled = true;
    
    $scope.$watch('beobachtung.date', function(newVal) {
        if (newVal){
            $scope.timeDisabled = false;
            $http.get('api/index.php/activityPerDate/'+ newVal)
                .success(
                    function(data, status, headers, config) {
            
                    $scope.dayActivities = data;
                })
                .error(
                    function(data, status, headers, config) {
            
                    $scope.dayActivities = status;
                });
            }
    });
    $scope.$watch('beobachtung.activityId', function(newVal) {
           if (!$scope.dayActivities || (newVal && newVal != 0)){
               $scope.timeDisabled = true;
           } else {
               $scope.timeDisabled = false;
           }
    }); 
    
    var formatTime = function(time) {
        var result = false, m;
        var re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
        if ((m = time.match(re))) {
            result = (m[1].length == 2 ? "" : "0") + m[1] + ":" + m[2];
        }
        return result;
    }
    
    $scope.addBeobachtung = function () {
        if(!$scope.beobachtung){
            alert('Wie wäre es, wenn du noch etwas in die Felder eingeben würdest? ;-)')
        } else if((!$scope.beobachtung.activityId || $scope.beobachtung.activityId == 0) && !$scope.beobachtung.time){
            alert('Entweder muss eine Aktivität ausgewählt oder eine Zeit eingegeben werden.')
        } else if($scope.beobachtung.activityId > 0 && $scope.beobachtung.time){
            alert('Es soll entweder eine Aktivität oder ein Zeitpunkt ausgewählt werden.')
        } else if($scope.beobachtung.time && !formatTime($scope.beobachtung.time)){
            alert('Die Zeit muss in der Form HH:MM eingegeben werden!');
        }else if(!$scope.beobachtung.categoryId){
            alert('Die Kategorie fehlt.');
        } else if(!$scope.beobachtung.beobachtung){
            alert('Hast du nicht noch etwas vergessen? Das Feld mit der Beobachtung ist leer. ;-)')
        }
        else{
        
        
            $scope.beobachtung.participantId = participantId; 
            BeobachtungFactory.create($scope.beobachtung)
            $location.path('/participants/view/'+ participantId);
        }
    }
    
}]);

app.controller('ActivitiesController', function($http, $scope) {
    // For some reason $resource won't work here, so went for $http.get()
    $http.get('api/index.php/activities')
        .success(
            function(data, status, headers, config) {
            
                $scope.activities = data;
            })
        .error(
            function(data, status, headers, config) {
            
                $scope.activities = status;
            });       
});