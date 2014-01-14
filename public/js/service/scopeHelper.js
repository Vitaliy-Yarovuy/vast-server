'use strict';

app.factory('scopeHelper',function ($parse){
    return {
        setData: function(scope, path, value, isSilent) {
            var run = function(){
                $parse(path).assign(scope,value);
            };
            if(isSilent){
                run();
            } else {
                scope.$apply(run);
            }
        }
    };
});