app.directive('ngSelectVideoType', function ($compile, $timeout) {

    function isSelectAll(scope,attr,count){
        var values = scope.$eval(attr);
        return values && values.length == count;
    }


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
            var $select = $element.find("select"),
                $btn = $element.find(".btn"),
                $options = $([]),
                totalCount = 0;

            scope.$watch(attrs.ngSelectVideoType,function(selectValues){
                if(selectValues){
                    $btn.html(selectValues.length == totalCount ? "Deselect All" :"Select All");
                }
            },50);

            $btn.on("click",function(){
                var action = isSelectAll(scope,attrs.ngSelectVideoType,totalCount) ? "deselect" : "select";
                $options.each(function(){
                    $select.multiselect(action,$(this).val());
                });
                $select.change();
            });

            $select.on("change",function(){
                var value = $(this).val() || [];
                setData(scope, attrs.ngSelectVideoType, value);
            });

            $timeout(function(){
                $options = $element.find("option");
                totalCount = $options.length;
                $select.multiselect({numberDisplayed: 2});
            },0);
        }
    };
});