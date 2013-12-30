app.controller('PointViewsCtrl',function($scope ) {
    $scope.select = function(event){
        var btn = angular.element(event.target),
            input = $(btn).parent().prev().get(0);
        input.focus();
        input.select();
    }
});