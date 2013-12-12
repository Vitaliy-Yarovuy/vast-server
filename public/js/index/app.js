(function(global){

    var app = angular.module('App',[]).controller('PointListCtrl',function($scope, socket, $timeout) {
        $scope.pointId = "";
        $scope.pointList = [];
        socket.emit("list:get",{},function(data){
            $scope.pointList = data.list;
        });
        socket.on("list:add",function(data){
            data.item.isNew = true;
            $timeout(function() {
                data.item.isNew = false;
            },3000);
            $scope.pointList.push(data.item);
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