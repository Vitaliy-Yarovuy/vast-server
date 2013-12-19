(function(global){

    var app = angular.module('App',[]).controller('PointCtrl',function($scope, socket, videoHelper) {
        $scope.point = {};
        $scope.pointId = window.pointID;
        $scope.videoLists = window.videoLists;
        socket.emit("testPoints::get", $scope.pointId, function(err, point){
            $scope.point = point;
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


        //todo create directive fot this
        var $text = $(".navbar .navbar-text");
        var html = $text.html().replace('"'+$scope.pointId+'"', " <span class='label label-success'> "+$scope.pointId+" </span>" );
        $text.html(html);
    });

   global.app = app;
})(window);