app.controller('PointSettingsCtrl',function($scope, $rootScope,socket, videoHelper, feathersClient, modelsHelper) {
    var prevPoint;

    $scope.getVideoWidth = function(key){
        return videoHelper.getSize($scope.videoLists[key]).map(function(size){ return size[0]}).join("/");
    };

    $scope.getVideoHeight = function(key){
        return videoHelper.getSize($scope.videoLists[key]).map(function(size){ return size[1]}).join("/");
    };

    $scope.getVideoBitRate = function(key){
        return videoHelper.getBitRate($scope.videoLists[key]).join("/");
    };

    $scope.getVideoFormat = function(key){
        return videoHelper.getFormat($scope.videoLists[key]);
    };


    $scope.$watch("point", _.debounce(function(){
        var nowPoint = _.cloneCleaner($scope.point);
        if(prevPoint){
            var diffPoint = _.diff(prevPoint, nowPoint);
            console.log("diffPoint",diffPoint);
            updateByDiff(diffPoint, nowPoint);
        }
        prevPoint = nowPoint;
    },300),true);


    function updateByDiff(diff, nowPoint){
        diff = _.addKeyAfterDiff(diff,nowPoint, ["id"]);
        if(diff.items){
            _.each(diff.items,function(item,key){
                item.vast && modelsHelper.updateVast(item.vast,nowPoint.items[key].vast);
            })
        }
    }

});