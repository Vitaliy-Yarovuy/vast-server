(function(global){

    var app = angular.module('App',[]).controller('PointCtrl',function($scope, socket) {
        $scope.point = {};
        $scope.pointId = window.pointID;
        socket.emit("point:get",{id:$scope.pointId},function(data){
            $scope.point = data.point;
        });

        var $text = $(".navbar .navbar-text");
        var html = $text.html().replace('"'+window.pointID+'"', " <span class='label label-success'> "+window.pointID+" </span>" );
        $text.html(html);
    });

   global.app = app;
})(window);