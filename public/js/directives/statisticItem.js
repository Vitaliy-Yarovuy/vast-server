app.directive('ngStatisticItem', function ($compile, $timeout, $http) {

    var labelClasses = ["danger","warning","info","default"];

    function getWatchString(type,data){
        if(type=="vast"){
            var event = data[1];
            return "vast.points." + event;
        } else if(type=="extensions"){
            var event = data[1];
            return "vast.extensionPoints." + event;
        } else if(type=="creative"){
            var creativeKey = _.keys(data[0].creatives)[data[1]],
                points = data[3] || "trackingPoints",
                event = data[2];
            return "vast.creatives." + creativeKey + "." +  points + "." +  event;
        }
    }

    return {
        restrict: 'A',
        scope: false,
        link: function (scope, $element, attrs) {
            var type = attrs.ngStatisticItem,
                keys = attrs.ngStatisticItemData,
                data = scope.$eval(keys),
                items = [],
                lastItem,
                isFind = false,
                html = "",
                indicateState = 0,
                timer,
                update = function (statisticPoint){

                    if(statisticPoint){
                        items = statisticPoint.items;
                        isFind = true;
                    } else {
                        if(type=="vast"){
                            items = scope.getEvents.apply(scope,data);
                            isFind = true;
                        }else if(type=="extensions"){
                            items = scope.getExtensionsEvents.apply(scope,data);
                            isFind = true;
                        } else if(type=="creative" && scope.getCreative.apply(scope,data)){
                            items = scope.getCreativeEvents.apply(scope,data);
                            isFind = true;
                        }
                    }

                    if(isFind){
                        lastItem = items[items.length-1];
                        html = '<span class="label label-danger">'+items.length+'</span>';
                        html += '&nbsp;&nbsp;';
                        if(lastItem){
                            html += (new Date(lastItem.data.time)).format("yyyy-mm-dd HH:MM:ss");
                        }else{
                            html += "---- -- -- --:--:--";
                        }
                        isFind = false;
                    }else{
                        html = "<span>---</span>";
                    }
                    $element.html(html);
                    indicateState = 0;
                    timer && clearTimeout(timer);
                    timer = setTimeout(updateIndicate, 500 + indicateState * 1000 );
                },
                updateIndicate = function(){
                    indicateState++;
                    $element.find(".label").get(0).className = "label label-" +labelClasses[indicateState];
                    if(indicateState < labelClasses.length-1){
                        timer = setTimeout(updateIndicate, 1500 + indicateState * 2000 );
                    }
                };

            //update();

            scope.$watch(getWatchString(type, data),update, true);
        }
    };
});