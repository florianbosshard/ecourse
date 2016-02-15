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
        }
        else{


            $scope.beobachtung.participantId = participantId;
            BeobachtungFactory.create($scope.beobachtung)
            $location.path('/participants/view/'+ participantId);
        }
    }

}]);

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

app.controller('NumBeobachtungenPerLeaderDayController', ['$http', '$scope', function($http, $scope) {
    // For some reason $resource won't work here, so went for $http.get()
    var getData = function(){
        $http.get('api/index.php/statsNumBeobachtungenPerLeaderDay')
            .success(
                function(data, status, headers, config) {

                    $scope.numBeobachtungenPerLeaderDay = data;
                })
            .error(
                function(data, status, headers, config) {
                    $scope.numBeobachtungenPerLeaderDay = status;
                });
    }

    var getDataChart = function(){
        $http.get('api/index.php/statsBeobachtungenCredatLeader')
            .success(
                function(data, status, headers, config) {
                  var line1=[['2015-12-03 22:33:06',1], ['2015-12-04 6:00AM',3], ['2015-12-04 8:00AM',4],['2015-12-05 8:00AM',5]];
                  var line2=[['2015-12-03 9:00AM',1], ['2015-12-04 5:00AM',2], ['2015-12-04 7:00AM',3],['2015-12-05 6:00AM',7]];

                  var arr = []
                  var finalArr = [];
                  var seriesArr = [];
                  var first = true;

                  var indexBefore = '';
                  for(var index in data){
                    if(first){
                      indexBefore = index;
                    }
                    if(index != indexBefore && !first){
                        finalArr = finalArr.concat([arr]);
                        seriesArr = seriesArr.concat({label: indexBefore});
                        console.log(indexBefore)
                        indexBefore = index;

                        arr = [];
                    }


                    arr = arr.concat(data[index]);
                    first = false;
                  }


                  finalArr = finalArr.concat([arr]);
                  seriesArr = seriesArr.concat({label: index});


                  var plot2 = $.jqplot('chartdiv', finalArr, {
                      title:'Anzahl Beobachtungen pro Tag',
                      axes:{
                        xaxis:{
                          renderer:$.jqplot.DateAxisRenderer,
                          tickOptions:{formatString:'%b %#d, %#I %p'},
                          tickInterval:'1 day'
                        }
                      },
                      series: seriesArr,
                      legend:{
                        show: true,
                        placement: 'outsideGrid',
                      },
                  });
                })
            .error(
                function(data, status, headers, config) {
                    alert('error');
                });
    }




    getData();
    getDataChart();

}]);
