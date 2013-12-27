app.controller('PointStatisticsCtrl',function($scope ) {

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

    $scope.getEventCount = function(vast, event){
        return vast.points[event] ? vast.points[event].items.length: 0;
    };

    $scope.getCreativeEventCount = function(vast, index, event, points){
        points = points || "trackingPoints";
        var creative = _.values(vast.creatives)[index];
        return (creative && creative[points][event]) ? creative[points][event].items.length: 0;
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


});