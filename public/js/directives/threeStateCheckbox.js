app.directive('ngThreeStateCheckbox', function ($compile, $timeout) {
    var states = [null,true,false];

    function setData(scope, path, value, isSilent) {
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

    return {
        scope: false,
        link: function (scope, $element, attrs) {
            var model = attrs.ngThreeStateCheckbox;

            scope.$watch(model,function(selectValues){
                if(selectValues == null){
                    $element.prop("indeterminate", true);
                }else{
                    $element.prop("indeterminate", false);
                    $element.prop("checked",!!selectValues);
                }
            });

            $element.parent().on("click",function(e){
                var state = scope.$eval(model),
                    index = (states.indexOf(state) + states.length + 1) % states.length,
                    newState = states[index];
                setData(scope,model,newState);
                e.preventDefault();
            });
        }
    };
});