app.directive('ngThreeStateCheckbox', function ($compile, $timeout, scopeHelper) {
    var states = [null,true,false];

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
                scopeHelper.setData(scope,model,newState);
                e.preventDefault();
            });
        }
    };
});