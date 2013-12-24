app.directive('ngVastXmlView', function ($compile, $timeout, $http) {

    var injection = "alert('not load')";

    function getUrl(id_point, id_vast){
        return location.origin + "/point/"+ id_point + "/vast/" + id_vast + "/vast.xml";
    }

    function safeTagsRegex(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    $http.get("/libs/xmltree.js").success(function(script) {
        injection = script;
    });

    return {
        scope: false,
        link: function (scope, $element, attrs) {
            var id_vast = scope.$eval(attrs.ngVastXmlView).id,
                id_point = scope.$eval(attrs.ngPoint).id,
                url = getUrl(id_point,id_vast);

            $element.on("load",function(){
                setTimeout(function(){
                    $element.get(0).contentWindow.eval(injection);
                },10);
            });

            setTimeout(function(){
                $element.get(0).src = url;
            },100);

            scope.$watch(attrs.ngVastXmlView,_.debounce(function(vast){
                $element.get(0).contentWindow.location.reload();
            },100), true);
        }
    };
});