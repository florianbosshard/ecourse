
function getCategories($http, $scope){
     $http.get('api/index.php/categories/')
        .success(
            function(data, status, headers, config) {

                $scope.categories = data;
            })
        .error(
            function(data, status, headers, config) {

                $scope.categories = status;
            });
}
function getDays($http, $scope){
      $http.get('api/index.php/days/')
   .success(
       function(data, status, headers, config) {

           $scope.days = data;
       })
   .error(
       function(data, status, headers, config) {

           $scope.days = status;
       });
}


function formatTime(time) {
    var result = false, m;
    var re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
    if ((m = time.match(re))) {
        result = (m[1].length == 2 ? "" : "0") + m[1] + ":" + m[2];
    }
    return result;
}

function getCurrentBeobachtung($http, $scope, beobachtungId){   
    console.log('get current beobachtung');
    
    $http.get('api/index.php/beobachtung/'+beobachtungId)
    .success(
        function(data, status, headers, config) {
            console.log(data);   
            $scope.beobachtung = data[0];
            
            
            if($scope.beobachtung.activityDateTime){
                    $scope.beobachtung.date = $scope.beobachtung.activityDateTime.split(' ')[0].trim();   
                    
            } else if($scope.beobachtung.beobachtungDateTime){
                $scope.beobachtung.date = $scope.boebachtung.beobachtungDateTime.split(' ')[0].trim();
            }
            
            console.log($scope.beobachtung);
                
        })
    .error(
        function(data, status, headers, config) {

            $scope.beobachtung = status;
        });
    
}

function watchDateChange($scope, $http){
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
}
function watchActivityIdChange($scope){
    $scope.$watch('beobachtung.activityId', function(newVal) {
           if (!$scope.dayActivities || (newVal && newVal != 0)){
               $scope.timeDisabled = true;
           } else {
               $scope.timeDisabled = false;
           }
    });
}

function initFormValues($scope, $http){
    getCategories($http, $scope);
    getDays($http, $scope);
    
    $scope.timeDisabled = true;
    watchDateChange($scope, $http);
    watchActivityIdChange($scope);
    console.log('finished');
}

function validateBeobachtung($scope){
        if(!$scope.beobachtung){
            alert('Wie w&auml;re es, wenn du noch etwas in die Felder eingeben w&uuml;rdest? ;-)')
        } else if((!$scope.beobachtung.activityId || $scope.beobachtung.activityId == 0) && !$scope.beobachtung.time){
            alert('Entweder muss eine Aktivit&auml;t ausgew&auml;hlt oder eine Zeit eingegeben werden.')
        } else if($scope.beobachtung.activityId > 0 && $scope.beobachtung.time){
            alert('Es soll entweder eine Aktivit&auml;t oder ein Zeitpunkt ausgew&auml;hlt werden.')
        } else if($scope.beobachtung.time && !formatTime($scope.beobachtung.time)){
            alert('Die Zeit muss in der Form HH:MM eingegeben werden!');
        }else if(!$scope.beobachtung.categoryId){
            alert('Die Kategorie fehlt.');
        } else if(!$scope.beobachtung.beobachtung){
            alert('Hast du nicht noch etwas vergessen? Das Feld mit der Beobachtung ist leer. ;-)')
        } else {
            return true;
        }
}

app.controller('BeobachtungController', ['$http', '$scope', 'BeobachtungFactory', '$routeParams', '$location', function($http, $scope, BeobachtungFactory, $routeParams, $location){
    $scope.beobachtung = null;
    var participantId = $routeParams.id;
    
    initFormValues($scope, $http);


    $scope.addBeobachtung = function () {
        if(validateBeobachtung($scope)===true){
            $scope.beobachtung.participantId = participantId;
            BeobachtungFactory.create($scope.beobachtung)
            $location.path('/participants/view/'+ participantId);
        }
    }

}]);


app.controller('BeobachtungModifyController', ['$http', '$scope', 'BeobachtungFactory', '$routeParams', '$location', function($http, $scope, BeobachtungFactory, $routeParams, $location){
    $scope.beobachtung = null;
    var beobachtungId = $routeParams.id;
    initFormValues($scope, $http);
    
    getCurrentBeobachtung($http, $scope, beobachtungId)

    $scope.modifyBeobachtung = function () {
        
        if(validateBeobachtung($scope)===true){
            BeobachtungFactory.update($scope.beobachtung)
            $location.path('/participants/view/'+ $scope.beobachtung.participantId);
        }
    }
    
    $scope.deleteBeobachtung = function (){

        BeobachtungFactory.delete({"id": beobachtungId});
        $location.path('/participants/view/'+ $scope.beobachtung.participantId);
    }
    
    $scope.backToParticipant = function(){
         $location.path('/participants/view/'+ $scope.beobachtung.participantId);       
    }

}]);