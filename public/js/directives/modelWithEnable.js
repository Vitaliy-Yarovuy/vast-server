app.directive('ngModelWithEnable', function ($compile, $timeout, scopeHelper) {

    return {
        scope: false,
        link: function (scope, $element, attrs) {
            var model = attrs.ngModelWithEnable,
                $btn = $element.find("input[type='checkbox']"),
                $input = $element.find("input:not([type='checkbox'])"),
                value = scope.$eval(model);

            scope.$watch(model,update);
            update(value);
            $btn.parent()[value == null? 'removeClass':'addClass']('active');

            function update(selectValues){
                if(selectValues == null){
                    $btn.prop("checked", false);
                    $input.prop("disabled",true);
                }else{
                    $btn.prop("checked", true);
                    $input.prop("disabled",false);
                    $input.val(selectValues);
                }
            }

            $btn.on("change",function(e){
                scopeHelper.setData(scope,model, $btn.prop("checked") ? $input.val(): null);
            });

            $input.on("change",function(e){
                if($btn.prop("checked")){
                    scopeHelper.setData(scope,model, $input.val());
                }
            });

        }
    };
});