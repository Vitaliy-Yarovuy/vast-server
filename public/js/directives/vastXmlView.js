app.directive('ngVastXmlView', function ($compile, $timeout, $http) {

    function getUrl(id_point, id_vast){
        return location.origin + "/point/"+ id_point + "/vast/" + id_vast + "/vast.xml";
    }

    return {
        scope: false,
        link: function (scope, $element, attrs) {
            var id_vast = scope.$eval(attrs.ngVastXmlView).id,
                id_point = scope.$eval(attrs.ngPoint).id,
                url = getUrl(id_point,id_vast),
                xmlTree,
                updateView = function (){
                    xmlTree && xmlTree.remove();
                    xmlTree = new XMLTree({
                        fpath: url,
                        container: $element.getSelector(true),
                        startExpanded: false
                    });
                };

            scope.$watch(attrs.ngVastXmlView,_.debounce(function(vast){
                updateView();
            },300), true);
        }
    };
});