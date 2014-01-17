(function(global){
    var app = angular.module('App',[]).controller('PointListCtrl',function($scope, socket, $timeout) {
        $scope.pointId = "";
        $scope.pointList = [];
        socket.emit("testpoints::find",{},function(err, list){
            $scope.pointList = list;
            setTimeout( function(){ $.isLoading( "hide" ); }, 200);
        });
        socket.on("testpoints created",function(item){
            item.isNew = true;
            $timeout(function() {
                item.isNew = false;
            },3000);
            $scope.pointList.push(item);
        });
        $scope.go = function(){
            var pointId = $scope.pointId.trim();
            if(pointId){
                location.href= "/point/"+$scope.pointId;
            }
        };
    });

   global.app = app;
})(window);