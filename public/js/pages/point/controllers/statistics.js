app.controller('PointStatisticsCtrl',function($scope, $rootScope, feathersClient ) {

    $scope.getEventsName = function(vastStatistics){
        var events = [];
        _.each(vastStatistics, function(vast){
            Object.keys(vast.points).forEach(function(key){
                events.indexOf(key) == -1 && events.push(key);
            });
        });
        return events;
    };

    $scope.getCreativeEventsName = function(vastStatistics,index, points){
        points = points || "trackingPoints";
        var events = [];
        _.each(vastStatistics, function(vast){
            var creative = _.values(vast.creatives)[index];
            if(creative){
                _.keys(creative[points]).forEach(function(key){
                    events.indexOf(key) == -1 && events.push(key);
                })
            }
        });
        return events;
    };

    $scope.getEvents = function(vast, event){
        return vast.points[event] ? vast.points[event].items: [];
    };

    $scope.getCreativeEvents = function(vast, index, event, points){
        points = points || "trackingPoints";
        var creative = _.values(vast.creatives)[index];
        return (creative && creative[points][event]) ? creative[points][event].items: [];
    };

    $scope.getVastCount = function(vastStatistics){
        return vastStatistics?  Object.keys(vastStatistics).length + 1: 2;
    };

    $scope.getCreativeCount = function(vastStatistics){
        var maxCount = _.reduce(vastStatistics, function(count,vast){
                return Math.max(count, Object.keys(vast.creatives).length);
            },0);
        return _.range(maxCount);
    };

    $scope.getMediaFilesCount = function(vastStatistics, index){
        var maxCount = _.reduce(vastStatistics, function(count,vast){
            var creative = _.keys(vast.creatives)[index],
                fCount = creative? _.keys(creative.mediaFiles).length : 0;
            return Math.max(count, fCount);
        },0);
        return _.range(maxCount);
    };

    $scope.getCreative = function(vast, index){
        return _.values(vast.creatives)[index];
    };

    $scope.getLastTime = function(items){
        var last = items[items.length-1];
        return new Date(last.data.time);
    };


    var vast20statisticClient = feathersClient.getClient("vast20statistic",{
        updated: function(vast20statistic){
            var statistics =  $rootScope.point.vastStatistics;
            _.each(statistics, function(vastStatistic, key){
                if(vastStatistic.id == vast20statistic.id){
                    statistics[key] = vast20statistic;
                }
            });
        }
    });

    $scope.clear = function(){
        var statistics =  $rootScope.point.vastStatistics;
        _.each(statistics, function(vastStatistic, key){
            vast20statisticClient.clear(vastStatistic.id, function(err, data){
            });
        });
    };

});