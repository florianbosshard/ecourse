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