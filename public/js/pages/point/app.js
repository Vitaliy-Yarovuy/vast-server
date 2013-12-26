(function(global){

    var app = angular.module('App',[]).controller('PointCtrl',function($scope, socket, videoHelper, feathersClient, modelsHelper) {
        var prevPoint;


        $scope.point = {};
        $scope.pointId = window.pointID;
        $scope.videoLists = window.videoLists;
        $scope.modelEnums = window.modelEnums;
        socket.emit("testpoints::get", $scope.pointId,function(err, point){
            $scope.point = point;
            prevPoint = _.cloneCleaner(point);
            window.select_point = point;
        });

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

        $scope.getLink = function(vast){
            return location.origin + "/point/"+ $scope.point.id + "/vast/" + vast.id + "/vast.xml";
        };

        $scope.$watch("point", _.debounce(function(){
            var nowPoint = _.cloneCleaner($scope.point);
            var diffPoint = _.diff(prevPoint, nowPoint);
            console.log("diffPoint",diffPoint);
            updateByDiff(diffPoint, nowPoint);
            prevPoint = nowPoint;
        },300),true);


        function updateByDiff(diff, nowPoint){
            diff = _.addKeyAfterDiff(diff,nowPoint, ["id"]);
            if(diff.vasts){
                _.each(diff.vasts,function(vast,key){
                    modelsHelper.updateVast(vast,nowPoint.vasts[key]);
                })
            }
        }


        //todo create directive fot this
        var $text = $(".navbar .navbar-text");
        var html = $text.html().replace('"'+$scope.pointId+'"', " <span class='label label-success'> "+$scope.pointId+" </span>" );
        $text.html(html);
    });

   global.app = app;
})(window);