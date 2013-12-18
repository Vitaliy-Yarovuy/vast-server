(function(global){

    var app = angular.module('App',[]).controller('PointCtrl',function($scope, socket) {
        $scope.point = {};
        $scope.pointId = window.pointID;
        socket.emit("testPoints::get", $scope.pointId, function(err, point){
            $scope.point = point;
            window.select_point = point;
        });

        var $text = $(".navbar .navbar-text");
        var html = $text.html().replace('"'+$scope.pointId+'"', " <span class='label label-success'> "+$scope.pointId+" </span>" );
        $text.html(html);
    });

   global.app = app;
})(window);