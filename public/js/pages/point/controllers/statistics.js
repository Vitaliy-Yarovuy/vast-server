app.controller('PointStatisticsCtrl',function($scope, $rootScope, feathersClient ) {

    $scope.getEventsName = function(items){
        var events = [];
        _.each(items, function(item){
            Object.keys(item.statistic.points).forEach(function(key){
                events.indexOf(key) == -1 && events.push(key);
            });
        });
        return events;
    };

    $scope.getExtensionsEventsName = function(items){
        var events = [];
        _.each(items, function(item){
            Object.keys(item.statistic.extensionPoints).forEach(function(key){
                events.indexOf(key) == -1 && events.push(key);
            });
        });
        return events;
    };

    $scope.getCreativeEventsName = function(items,index, points){
        points = points || "trackingPoints";
        var events = [];
        _.each(items, function(item){
            var creative = _.values(item.statistic.creatives)[index];
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

    $scope.getExtensionsEvents = function(vast, event){
        return vast.extensionPoints[event] ? vast.extensionPoints[event].items: [];
    };

    $scope.getCreativeEvents = function(vast, index, event, points){
        points = points || "trackingPoints";
        var creative = _.values(vast.creatives)[index];
        return (creative && creative[points][event]) ? creative[points][event].items: [];
    };

    $scope.getVastCount = function(items){
        return items?  Object.keys(items).length + 1: 2;
    };

    $scope.getCreativeCount = function(items){
        var maxCount = _.reduce(items, function(count,item){
                return Math.max(count, Object.keys(item.statistic.creatives).length);
            },0);
        return _.range(maxCount);
    };

    $scope.getMediaFilesCount = function(items, index){
        var maxCount = _.reduce(items, function(count,item){
            var creative = _.keys(item.statistic.creatives)[index],
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
            var items =  $rootScope.point.items;
            _.each(items, function(item, key){
                if(item.statistic.id == vast20statistic.id){
                    item.statistic = vast20statistic;
                }
            });
            console.log("update vast20statistic",vast20statistic);
        }
    });

    $scope.clear = function(){
        var items =  $rootScope.point.items;
        _.each(items, function(item, key){
            vast20statisticClient.clear(item.statistic.id, function(err, data){
            });
        });
    };

});