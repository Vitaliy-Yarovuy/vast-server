'use strict';

app.factory('scopeHelper',function ($rootScope){
    return {
        setData: function(scope, path, value, isSilent) {
            var key,
                pathEls = path.split("."),
                element = scope;
            while (pathEls.length > 1 && element) {
                element = element[pathEls.shift()];
            }
            while (pathEls.length > 1) {
                key = pathEls.shift();
                element[key] = {};
                element = element[key];
            }
            element[pathEls.shift()] = value;
            isSilent || scope.$apply();
        }
    };
});