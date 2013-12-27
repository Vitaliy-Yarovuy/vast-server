(function(global){

    var app = angular.module('App',[]);
    app.run(function($rootScope, socket){
        $rootScope.point = {};
        $rootScope.pointId = window.pointID;
        $rootScope.videoLists = window.videoLists;
        $rootScope.modelEnums = window.modelEnums;

        socket.emit("testpoints::get", $rootScope.pointId,function(err, point){
            $rootScope.point = point;
            window.select_point = point;
        });

        $rootScope.getVastLink = function(vast){
            return location.origin + "/point/"+ $rootScope.point.id + "/vast/" + vast.id + "/vast.xml";
        };

        //todo create directive fot this
        var $text = $(".navbar .navbar-text");
        var html = $text.html().replace('"'+$rootScope.pointId+'"', " <span class='label label-success'> "+$rootScope.pointId+" </span>" );
        $text.html(html);
    });

   global.app = app;
})(window);